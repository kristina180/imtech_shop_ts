
<h1 align="center">Imtech</h1>


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


## About
This is a modern, responsive e-commerce web application designed to provide users with a smooth and intuitive shopping experience. The interface features a dark theme and includes the following key functionalities:
- Category Menu: Sidebar navigation with product categories for easy browsing.
- Search Functionality: Global search bar to find any product quickly.
- User Authentication: User registration and login functionality.
- Favorites: Users can add products to their favorites for later reference.
- Shopping Cart: Real-time cart with item count and checkout capabilities.
- Product Filtering: Filter products by product name and by price range directly in category view.
- Promotional Banners: Highlight new or featured products to attract user attention.
- Popular Products: Section showing trending or recommended products.
- Responsive Design: Optimized for desktops, tablets, and mobile devices.

## Preview


<p align="center"> Main Page
   
<img width="1897" height="1066" alt="image" src="https://github.com/user-attachments/assets/4b9fc395-69aa-4768-96e7-b0bf98142620" />
</p>

<p align="center"> User Page
   
<img width="1808" height="867" alt="image" src="https://github.com/user-attachments/assets/b7fc9a44-67b4-4aba-a4e7-36c311b58a41" />
</p>
<p align="center"> Cart Page

<img width="1680" height="858" alt="image" src="https://github.com/user-attachments/assets/f3bb5dc4-e1f6-4af4-aee8-22aa19a2d2aa" />
</p>
<p align="center"> Favorites Page

<img width="1850" height="874" alt="image" src="https://github.com/user-attachments/assets/4645ef6f-3f6f-4a9b-81c5-d5d7b586c0de" />
</p>

<p align="center"> Page of products filtered by category

<img width="1446" height="879" alt="image" src="https://github.com/user-attachments/assets/2807b55c-e531-4d12-931b-5c1676852e1d" />
</p>

<p align="center"> Product Page
   
<img width="1644" height="686" alt="image" src="https://github.com/user-attachments/assets/0ee5685e-7e14-46b2-8503-535625d01bb0" /></p>



## Features

- **Category Browsing**  
  View products filtered by categories based on the URL path.

- **Search and Filtering**  
  Filter products by name and maximum price using a user-friendly search form.

- **Pagination**  
  Products are displayed with pagination, showing 10 items per page with page navigation.

- **Responsive Design**  
  Layout and components adapt seamlessly to different screen sizes, from large desktops to mobile devices.

- **Image Fallback Handling**  
  Displays a placeholder image if the product image fails to load.

- **Optimized Rendering**  
  Utilizes `useMemo` for efficient filtering and pagination to improve performance.

- **User Experience (UX)**  

- **Accessibility (a11y)**  
  Includes ARIA attributes for improved screen reader support and keyboard navigation.




## Tech Stack

| Technology         | Purpose                                      |
|--------------------|----------------------------------------------|
| **Next.js**        | React framework with SSR/SSG                 |
| **React**          | UI library                                   |
| **TypeScript**     | Static typing and type safety                |
| **CSS**            | Styling          |
| **Redux Toolkit**  | State management                             |
| **Axios**          | API requests                                 |
| **fakestoreapi.in**| Mock API for products data                   |
| **api.escuelajs.co**| Mock API for user data                   |




## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/kristina180/imtech_shop_ts.git
   cd imtech_shop_ts

2. Install dependencies:
   
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install   
   ```
3. Run the development server:
  
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel
https://imtech-shop-ts.vercel.app/
Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
