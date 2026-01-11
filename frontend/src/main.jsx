import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "@/components/theme-provider"
import { UserProvider } from './context/userContext'
import { ProductProvider } from './context/ProductContext'
import { CartProvider } from './context/CartContext'

export const server = "http://localhost:5000"
export const categories = [ 
  "smartphone", 
  "laptop",
  "watch",
  "shoes",
  "Electronics",
  "Fashion and Apparel",
  "Food",
  "Beverages",
  "DIY and Hardware",
  "Furniture",
  "Media",
  "Beauty and Personal Care",
  "Toys and Hobbies",
  "Home and Lifestyle",
  "Pet Supplies",
  "Health and Wellness"
];

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </ThemeProvider>
  </StrictMode>
)

// Accept HMR updates
if (import.meta.hot) {
  import.meta.hot.accept()
}