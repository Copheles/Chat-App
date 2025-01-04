import { Model, Document } from 'mongoose';
import { Request } from 'express';

interface QueryOptions {
  searchFields?: string[];
  populateFields?: any[];
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
  sortBy: string = '-createdAt'
): Promise<PaginatedResults<T>> {
  const { searchFields = [], populateFields = [], additionalFilters = {} } = options;

  const searchQuery: Record<string, any> = { ...additionalFilters };
  const { search, page = 1, limit = 10 } = req.query;

  if (search && searchFields.length > 0) {
    searchQuery.$or = searchFields.map((field) => ({
      [field]: { $regex: search, $options: 'i' }
    }));
  }


  let sort;

  const pageNumber = Math.max(1, parseInt(page as string, 10));
  const pageSize = Math.max(1, parseInt(limit as string, 10));
  const skip = (pageNumber - 1) * pageSize;

  if(sortBy){
    sort = sortBy
  }

  let query = model
    .find(searchQuery)
    .sort(sort as string) // Allow sorting by nested fields
    .skip(skip)
    .limit(pageSize);

  if (populateFields.length > 0) {
    populateFields.forEach((field) => {
      query = query.populate(field);
    });
  }

  const [data, totalItems] = await Promise.all([query.exec(), model.countDocuments(searchQuery).exec()]);

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