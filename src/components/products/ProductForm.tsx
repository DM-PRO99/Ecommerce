'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const productSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters').max(100, 'Name cannot exceed 100 characters'),
  quantity: yup.number().required('Quantity is required').min(0, 'Quantity cannot be negative').integer('Quantity must be an integer'),
  price: yup.number().required('Price is required').min(0, 'Price cannot be negative'),
  reference: yup.string().required('Reference is required').min(3, 'Reference must be at least 3 characters').max(50, 'Reference cannot exceed 50 characters'),
  imageUrl: yup.string().required('Image is required').url('Please provide a valid URL'),
});

type ProductFormData = yup.InferType<typeof productSchema>;

interface ProductFormProps {
  initialData?: {
    _id?: string;
    name: string;
    quantity: number;
    price: number;
    reference: string;
    imageUrl: string;
  };
  isEdit?: boolean;
}

export default function ProductForm({ initialData, isEdit = false }: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(initialData?.imageUrl || '');
  const router = useRouter();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema),
    defaultValues: initialData || {
      name: '',
      quantity: 0,
      price: 0,
      reference: '',
      imageUrl: '',
    },
  });

  const handleImageUpload = async (file: File) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/uploads/cloudinary', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data: { url: string } = await response.json();

      setImagePreview(data.url);
      setValue('imageUrl', data.url, { shouldValidate: true });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsLoading(true);
      
      const url = isEdit && initialData?._id 
        ? `/api/products/${initialData._id}`
        : '/api/products';
      
      const method = isEdit ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save product');
      }

      toast.success(`Product ${isEdit ? 'updated' : 'created'} successfully`);
      router.push('/dashboard/products');
      router.refresh();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} product`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {isEdit ? t('productForm.titleEdit') : t('productForm.titleAdd')}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {isEdit ? t('productForm.subtitleEdit') : t('productForm.subtitleAdd')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {t('productForm.nameLabel')}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
                {t('productForm.referenceLabel')}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="reference"
                  {...register('reference')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.reference && (
                  <p className="mt-1 text-sm text-red-600">{errors.reference.message}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                {t('productForm.priceLabel')}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">{t('productForm.priceCurrency')}</span>
                </div>
                <input
                  type="number"
                  id="price"
                  step="0.01"
                  {...register('price')}
                  className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                {t('productForm.quantityLabel')}
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="quantity"
                  {...register('quantity')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.quantity && (
                  <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700">{t('productForm.imageLabel')}</label>
              <div className="mt-1 flex items-center">
                <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                  ) : (
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </span>
                <div className="ml-4">
                  <input
                    id="image-upload"
                    name="image-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(file);
                      }
                    }}
                  />
                  <label
                    htmlFor="image-upload"
                    className="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                  >
                    {imagePreview ? t('productForm.imageChange') : t('productForm.imageUpload')}
                  </label>
                  <input type="hidden" {...register('imageUrl')} />
                  {errors.imageUrl && (
                    <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push('/dashboard/products')}
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                {t('productForm.cancel')}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isLoading
                  ? t('productForm.saving')
                  : isEdit
                    ? t('productForm.submitUpdate')
                    : t('productForm.submitCreate')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
