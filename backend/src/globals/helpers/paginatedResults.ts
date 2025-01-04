import { Model, Document } from 'mongoose';
import { Request } from 'express';

interface QueryOptions {
  searchFields?: string[];
  populateFields?: { from: string; localField: string; foreignField: string; as: string }[];
  additionalFilters?: Record<string, any>;
}

export interface PaginatedResults<T> {
  data: T[];
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
}

export async function getPaginatedResults<T extends Document>(
  model: Model<T>,
  req: Request,
  options: QueryOptions = {},
  sortBy: string = 'createdAt' // Default sort field
): Promise<PaginatedResults<T>> {
  const { searchFields = [], populateFields = [], additionalFilters = {} } = options;

  const { search, page = 1, limit = 10, sort } = req.query;
  const searchQuery: Record<string, any> = { ...additionalFilters };

  // Update sortBy if `sort` query is provided
  if (sort) sortBy = sort as string;

  // Add search conditions
  if (search && searchFields.length > 0) {
    searchQuery.$or = searchFields.map((field) => ({
      [field]: { $regex: search, $options: 'i' }
    }));
  }

  const pageNumber = Math.max(1, parseInt(page as string, 10));
  const pageSize = Math.max(1, parseInt(limit as string, 10));
  const skip = (pageNumber - 1) * pageSize;

  // Build aggregation pipeline
  const pipeline: any[] = [{ $match: searchQuery }];

  // Add populate stages
  populateFields.forEach((field) => {
    pipeline.push({
      $lookup: {
        from: field.from,
        localField: field.localField,
        foreignField: field.foreignField,
        as: field.as
      }
    });
  });

  // Handle sorting by nested fields
  if (sortBy.includes('lastMessage.createdAt')) {
    pipeline.push({
      $addFields: {
        lastMessageCreatedAt: {
          $arrayElemAt: ['$lastMessage.createdAt', 0]
        }
      }
    });
    sortBy = sortBy.replace('lastMessage.createdAt', 'lastMessageCreatedAt');
  }

  // Add sorting and pagination stages
  pipeline.push(
    { $sort: { [sortBy.replace('-', '')]: sortBy.startsWith('-') ? -1 : 1 } },
    { $skip: skip },
    { $limit: pageSize },
    { $project: { lastMessageCreatedAt: 0 } } // Clean up temporary fields
  );

  const [data, totalItems] = await Promise.all([
    model.aggregate(pipeline).exec(),
    model.countDocuments(searchQuery).exec()
  ]);

  return {
    data,
    pagination: {
      totalItems,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalItems / pageSize),
      pageSize
    }
  };
}
