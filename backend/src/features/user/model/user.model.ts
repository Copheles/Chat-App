import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: string;
}

export interface UserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minlength: 3,
      maxlength: 20,
      trime: true,
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      unique: true
    },
    role: {
      type: String,
      enum: ['User', 'Admin'],
      default: 'User'
    },
    avatar: {
      type: String
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', async function (this: UserDocument) {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);

export default User;
