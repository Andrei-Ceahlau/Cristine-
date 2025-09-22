import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  query,
  where,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config/firebase';

// Interfață pentru produs
export interface Product {
  id?: string;
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
  updatedAt?: Date;
}

// Funcție pentru a obține toate produsele
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, 'products'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const products: Product[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      products.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
      } as Product);
    });
    
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

// Funcție pentru a obține produsele după categorie
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    let q;
    
    if (category === 'toate') {
      q = query(
        collection(db, 'products'),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(
        collection(db, 'products'),
        where('category', '==', category),
        orderBy('createdAt', 'desc')
      );
    }
    
    const querySnapshot = await getDocs(q);
    const products: Product[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      products.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
      } as Product);
    });
    
    return products;
  } catch (error) {
    console.error('Error getting products by category:', error);
    throw error;
  }
};

// Funcție pentru a obține produsele populare
export const getPopularProducts = async (): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, 'products'),
      where('isPopular', '==', true),
      orderBy('rating', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const products: Product[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      products.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
      } as Product);
    });
    
    return products;
  } catch (error) {
    console.error('Error getting popular products:', error);
    throw error;
  }
};

// Funcție pentru a obține un produs după ID
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
      } as Product;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting product by ID:', error);
    throw error;
  }
};

// Funcție pentru a crea un produs nou
export const createProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const productData = {
      ...product,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, 'products'), productData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Funcție pentru a actualiza un produs
export const updateProduct = async (id: string, product: Partial<Product>): Promise<void> => {
  try {
    const docRef = doc(db, 'products', id);
    const updateData = {
      ...product,
      updatedAt: Timestamp.now()
    };
    
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Funcție pentru a șterge un produs
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    // Șterge imaginea din Storage dacă există
    const product = await getProductById(id);
    if (product?.imageUrl) {
      try {
        const imageRef = ref(storage, product.imageUrl);
        await deleteObject(imageRef);
      } catch (storageError) {
        console.warn('Error deleting image from storage:', storageError);
      }
    }
    
    // Șterge produsul din Firestore
    await deleteDoc(doc(db, 'products', id));
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Funcție pentru a încărca o imagine
export const uploadProductImage = async (file: File, productId: string): Promise<string> => {
  try {
    const imageRef = ref(storage, `products/${productId}/${file.name}`);
    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Funcție pentru a obține categoriile disponibile
export const getCategories = async (): Promise<string[]> => {
  try {
    const products = await getAllProducts();
    const categories = new Set<string>();
    
    products.forEach(product => {
      if (product.category) {
        categories.add(product.category);
      }
    });
    
    return Array.from(categories).sort();
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
};

// Funcție pentru a căuta produse
export const searchProducts = async (searchTerm: string): Promise<Product[]> => {
  try {
    const products = await getAllProducts();
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// Funcție pentru a actualiza stocul unui produs
export const updateProductStock = async (id: string, newStock: number): Promise<void> => {
  try {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, {
      stock: newStock,
      inStock: newStock > 0,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating product stock:', error);
    throw error;
  }
};




