import { supabase } from '../config/supabase';

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
  createdAt?: string;
  updatedAt?: string;
}

// Funcție pentru a crea o comandă nouă
export const createOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const orderData = {
      ...order,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();

    if (error) throw error;
    return data.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Funcție pentru a actualiza o comandă
export const updateOrder = async (id: string, order: Partial<Order>): Promise<void> => {
  try {
    const updateData = {
      ...order,
      updated_at: new Date().toISOString()
    };
    
    const { error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

// Funcție pentru a șterge o comandă
export const deleteOrder = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

// Funcție pentru a obține toate comenzile (pentru admin)
export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return data.map(order => ({
      id: order.id,
      userId: order.user_id,
      userEmail: order.user_email,
      userName: order.user_name,
      userPhone: order.user_phone,
      items: order.items,
      totalAmount: order.total_amount,
      status: order.status,
      deliveryAddress: order.delivery_address,
      deliveryDate: order.delivery_date,
      deliveryTime: order.delivery_time,
      notes: order.notes,
      createdAt: order.created_at,
      updatedAt: order.updated_at
    }));
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
};

// Funcție pentru a obține comenzile unui utilizator
export const getUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return data.map(order => ({
      id: order.id,
      userId: order.user_id,
      userEmail: order.user_email,
      userName: order.user_name,
      userPhone: order.user_phone,
      items: order.items,
      totalAmount: order.total_amount,
      status: order.status,
      deliveryAddress: order.delivery_address,
      deliveryDate: order.delivery_date,
      deliveryTime: order.delivery_time,
      notes: order.notes,
      createdAt: order.created_at,
      updatedAt: order.updated_at
    }));
  } catch (error) {
    console.error('Error getting user orders:', error);
    throw error;
  }
};

// Funcție pentru a obține o comandă după ID
export const getOrderById = async (id: string): Promise<Order | null> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No rows found
      throw error;
    }
    
    return {
      id: data.id,
      userId: data.user_id,
      userEmail: data.user_email,
      userName: data.user_name,
      userPhone: data.user_phone,
      items: data.items,
      totalAmount: data.total_amount,
      status: data.status,
      deliveryAddress: data.delivery_address,
      deliveryDate: data.delivery_date,
      deliveryTime: data.delivery_time,
      notes: data.notes,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  } catch (error) {
    console.error('Error getting order:', error);
    throw error;
  }
};

// Funcție pentru a obține comenzile după status
export const getOrdersByStatus = async (status: Order['status']): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return data.map(order => ({
      id: order.id,
      userId: order.user_id,
      userEmail: order.user_email,
      userName: order.user_name,
      userPhone: order.user_phone,
      items: order.items,
      totalAmount: order.total_amount,
      status: order.status,
      deliveryAddress: order.delivery_address,
      deliveryDate: order.delivery_date,
      deliveryTime: order.delivery_time,
      notes: order.notes,
      createdAt: order.created_at,
      updatedAt: order.updated_at
    }));
  } catch (error) {
    console.error('Error getting orders by status:', error);
    throw error;
  }
};

// Funcție pentru a actualiza statusul unei comenzi
export const updateOrderStatus = async (id: string, status: Order['status']): Promise<void> => {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};