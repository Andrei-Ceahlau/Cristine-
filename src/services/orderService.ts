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
import { db } from '../config/firebase';

// Interfață pentru element din comandă
export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

// Interfață pentru comandă
export interface Order {
  id?: string;
  userId: string;
  userEmail: string;
  userName: string;
  userPhone: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  deliveryAddress?: string;
  deliveryDate?: string;
  deliveryTime?: string;
  notes?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Funcție pentru a crea o comandă nouă
export const createOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const orderData = {
      ...order,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    const docRef = await addDoc(collection(db, 'orders'), orderData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Funcție pentru a actualiza o comandă
export const updateOrder = async (id: string, order: Partial<Order>): Promise<void> => {
  try {
    const orderRef = doc(db, 'orders', id);
    const updateData = {
      ...order,
      updatedAt: Timestamp.now()
    };
    
    await updateDoc(orderRef, updateData);
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

// Funcție pentru a șterge o comandă
export const deleteOrder = async (id: string): Promise<void> => {
  try {
    const orderRef = doc(db, 'orders', id);
    await deleteDoc(orderRef);
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

// Funcție pentru a obține toate comenzile (pentru admin)
export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const q = query(
      collection(db, 'orders'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];
    
    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data()
      } as Order);
    });
    
    return orders;
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
};

// Funcție pentru a obține comenzile unui utilizator
export const getUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];
    
    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data()
      } as Order);
    });
    
    return orders;
  } catch (error) {
    console.error('Error getting user orders:', error);
    throw error;
  }
};

// Funcție pentru a obține o comandă după ID
export const getOrderById = async (id: string): Promise<Order | null> => {
  try {
    const orderRef = doc(db, 'orders', id);
    const orderSnap = await getDoc(orderRef);
    
    if (orderSnap.exists()) {
      return {
        id: orderSnap.id,
        ...orderSnap.data()
      } as Order;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting order:', error);
    throw error;
  }
};

// Funcție pentru a obține comenzile după status
export const getOrdersByStatus = async (status: Order['status']): Promise<Order[]> => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];
    
    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data()
      } as Order);
    });
    
    return orders;
  } catch (error) {
    console.error('Error getting orders by status:', error);
    throw error;
  }
};

// Funcție pentru a actualiza statusul unei comenzi
export const updateOrderStatus = async (id: string, status: Order['status']): Promise<void> => {
  try {
    const orderRef = doc(db, 'orders', id);
    await updateDoc(orderRef, {
      status,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};










