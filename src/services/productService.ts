import { supabase } from '../config/supabase';

// Interfață pentru produs
export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  image: string;
  imageUrl?: string;
  category: string;
  inStock: boolean;
  stock: number;
  isPopular?: boolean;
  rating?: number;
  createdAt?: Date;
}

// Funcție pentru a obține toate produsele
export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: product.price,
      image: product.image_url || '',
      imageUrl: product.image_url || '',
      category: product.category,
      inStock: product.in_stock,
      stock: product.in_stock ? 100 : 0, // Default stock pentru Supabase
      isPopular: false,
      rating: 5,
      createdAt: new Date(product.created_at)
    }));
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

// Funcție pentru a obține produsele după categorie
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: product.price,
      image: product.image_url || '',
      imageUrl: product.image_url || '',
      category: product.category,
      inStock: product.in_stock,
      stock: product.in_stock ? 100 : 0,
      isPopular: false,
      rating: 5,
      createdAt: new Date(product.created_at)
    }));
  } catch (error) {
    console.error('Error getting products by category:', error);
    throw error;
  }
};

// Funcție pentru a obține un produs după ID
export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No rows found
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description || '',
      price: data.price,
      image: data.image_url || '',
      imageUrl: data.image_url || '',
      category: data.category,
      inStock: data.in_stock,
      stock: data.in_stock ? 100 : 0,
      isPopular: false,
      rating: 5,
      createdAt: new Date(data.created_at)
    };
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
};

// Funcție pentru a crea un produs nou (doar pentru admin)
export const createProduct = async (product: Omit<Product, 'id' | 'createdAt'>): Promise<number> => {
  try {
    const productData = {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image_url: product.image || product.imageUrl,
      in_stock: product.inStock,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select()
      .single();

    if (error) throw error;
    return data.id;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Funcție pentru a actualiza un produs (doar pentru admin)
export const updateProduct = async (id: number, product: Partial<Product>): Promise<void> => {
  try {
    const updateData: any = {};
    
    if (product.name !== undefined) updateData.name = product.name;
    if (product.description !== undefined) updateData.description = product.description;
    if (product.price !== undefined) updateData.price = product.price;
    if (product.category !== undefined) updateData.category = product.category;
    if (product.image !== undefined) updateData.image_url = product.image;
    if (product.imageUrl !== undefined) updateData.image_url = product.imageUrl;
    if (product.inStock !== undefined) updateData.in_stock = product.inStock;

    const { error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Funcție pentru a șterge un produs (doar pentru admin)
export const deleteProduct = async (id: number): Promise<void> => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Funcție pentru a obține categoriile unice
export const getCategories = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('category')
      .not('category', 'is', null);

    if (error) throw error;

    // Extrage categoriile unice
    const categories = [...new Set(data.map(item => item.category))];
    return categories.sort();
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
};

// Funcție pentru a căuta produse
export const searchProducts = async (searchTerm: string): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: product.price,
      image: product.image_url || '',
      imageUrl: product.image_url || '',
      category: product.category,
      inStock: product.in_stock,
      stock: product.in_stock ? 100 : 0,
      isPopular: false,
      rating: 5,
      createdAt: new Date(product.created_at)
    }));
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// Funcție pentru a obține produsele populare (opțional)
export const getPopularProducts = async (): Promise<Product[]> => {
  try {
    // Pentru moment, returnează primele 6 produse
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('in_stock', true)
      .order('created_at', { ascending: false })
      .limit(6);

    if (error) throw error;

    return data.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: product.price,
      image: product.image_url || '',
      imageUrl: product.image_url || '',
      category: product.category,
      inStock: product.in_stock,
      stock: product.in_stock ? 100 : 0,
      isPopular: true,
      rating: 5,
      createdAt: new Date(product.created_at)
    }));
  } catch (error) {
    console.error('Error getting popular products:', error);
    throw error;
  }
};

// Funcție pentru a actualiza stocul unui produs
export const updateProductStock = async (id: number, inStock: boolean): Promise<void> => {
  try {
    const { error } = await supabase
      .from('products')
      .update({ in_stock: inStock })
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating product stock:', error);
    throw error;
  }
};