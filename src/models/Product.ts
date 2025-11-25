import { Schema, model, models } from 'mongoose';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    reference: {
      type: String,
      required: [true, 'Reference is required'],
      minlength: [3, 'Reference must be at least 3 characters'],
      maxlength: [50, 'Reference cannot exceed 50 characters'],
      unique: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      match: [
        /^https?:\/\//,
        'Please provide a valid URL with http or https',
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default models.Product || model('Product', productSchema);
