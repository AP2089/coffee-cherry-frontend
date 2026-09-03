import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

export type CoffeeWeight = 250 | 500 | 1000

export interface Coffee {
  _id: string
  name: string
  slug: string
  country: string
  region: string
  variety: string
  process: string
  altitude: string
  description: string
  story: string
  flavorNotes: string[]
  price: number
  weights: CoffeeWeight[]
  image: string
  gallery: string[]
  stock: number
  createdAt?: string
  updatedAt?: string
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'

export interface OrderItem {
  coffeeId: string
  slug: string
  name: string
  weight: CoffeeWeight
  quantity: number
  price: number
}

export interface Customer {
  name: string
  phone: string
  email: string
  city: string
  address: string
  comment?: string
}

export interface Order {
  _id: string
  items: OrderItem[]
  customer: Customer
  totalPrice: number
  status: OrderStatus
  createdAt?: string
  updatedAt?: string
}

export interface CreateOrderPayload {
  items: Array<{
    slug: string
    weight: CoffeeWeight
    quantity: number
  }>
  customer: Customer
}

export type FetchOptions = NitroFetchOptions<NitroFetchRequest>

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export type ContactMessageStatus = 'new' | 'read' | 'archived'

export interface ContactMessage {
  _id: string
  name: string
  email: string
  message: string
  status: ContactMessageStatus
  createdAt?: string
  updatedAt?: string
}

export interface CreateContactMessagePayload {
  name: string
  email: string
  message: string
}

export interface CartItem {
  slug: string
  name: string
  weight: CoffeeWeight
  quantity: number
  price: number
  image: string
  country: string
}

export type CoffeeSlug = 'bloom' | 'velvet' | 'santos' | 'noir' | 'ember'
