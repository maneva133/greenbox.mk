# GreenBox.mk - Organic Food Packages Online Store

A complete React web application for an online store specializing in organic food packages. This application includes product catalog, shopping cart, payment simulation, delivery tracking, and admin management features.

## Features

- **Home Page**: Browse products by category with a responsive product catalog
- **Shopping Cart**: Add/remove products, update quantities, view subtotal and total
- **Product Recommendations**: Intelligent upselling system that suggests complementary products when items are added to cart
- **Payment Page**: Simulated payment processing with form validation
- **Delivery Tracking**: Real-time delivery status updates (Pending, In Transit, Delivered)
- **Admin Dashboard**: Manage products (add/edit/delete), apply discounts, and view inventory reports

## Project Structure

```
greenbox.mk/
├── public/
│   ├── index.html
│   └── 404.html
├── src/
│   ├── components/
│   │   ├── Navigation.js
│   │   ├── Navigation.css
│   │   ├── ProductCard.js
│   │   ├── ProductCard.css
│   │   ├── RecommendationCard.js
│   │   ├── RecommendationCard.css
│   │   ├── CartItem.js
│   │   └── CartItem.css
│   ├── context/
│   │   └── CartContext.js
│   ├── data/
│   │   ├── products.json
│   │   └── recommendations.json
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Home.css
│   │   ├── Cart.js
│   │   ├── Cart.css
│   │   ├── Payment.js
│   │   ├── Payment.css
│   │   ├── Delivery.js
│   │   ├── Delivery.css
│   │   ├── Admin.js
│   │   └── Admin.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000)

3. **Build for production:**
   ```bash
   npm run build
   ```
   This creates an optimized production build in the `build` folder, ready for deployment to GitHub Pages or any static hosting service.

## Deployment to GitHub Pages

The project is already configured for GitHub Pages deployment! Follow these steps:

1. **Update the homepage URL in `package.json`:**
   - Open `package.json`
   - Replace `YOUR_USERNAME` in the homepage field with your GitHub username:
   ```json
   "homepage": "https://yourusername.github.io/greenbox.mk"
   ```
   - If your repository name is different, update it accordingly

2. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```
   This command will:
   - Build your production-ready app
   - Deploy it to the `gh-pages` branch
   - Make it available at your GitHub Pages URL

3. **Enable GitHub Pages (if not already enabled):**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select `gh-pages` branch
   - Click **Save**

4. **Access your deployed app:**
   - Your app will be live at: `https://yourusername.github.io/greenbox.mk`
   - It may take a few minutes for changes to propagate

### Important Notes

- **React Router Support**: The project includes `404.html` and routing scripts to handle client-side routing on GitHub Pages. This allows clean URLs without hash fragments.
- **Future Deployments**: After the initial setup, simply run `npm run deploy` whenever you want to update the live site.
- **Custom Domain**: If you have a custom domain, update the `homepage` field in `package.json` to match your domain.

## Data Management

### Current Implementation
The application currently uses local JSON files for data storage:
- `src/data/products.json` - Product catalog
- `src/data/recommendations.json` - Product recommendation rules

### Replacing with Real API

To replace local JSON files with real API calls, look for comments in the code marked with:
```javascript
// Simulate API call - Replace this with actual API call later
// Example: const response = await fetch('/api/products');
// const data = await response.json();
```

**Key locations to update:**
- `src/pages/Home.js` (line ~20): Product fetching
- `src/pages/Admin.js` (line ~20): Product management
- `src/pages/Payment.js` (line ~40): Payment processing
- `src/context/CartContext.js`: Consider adding API calls for cart persistence

## Features in Detail

### Product Recommendations
The recommendation system works in two ways:
1. **Product-specific recommendations**: Defined in `recommendations.json` by product ID
2. **Category-based recommendations**: Fallback rules based on product categories

When a product is added to the cart, the system automatically displays up to 4 recommended complementary products.

### Cart Management
- Cart state is persisted in localStorage
- Supports adding, removing, and updating quantities
- Automatic calculation of subtotal, tax (10%), and total

### Admin Features
- Add new products with full details
- Edit existing products
- Delete products with confirmation
- Apply percentage discounts to products
- View inventory statistics and category breakdown

## Technologies Used

- **React 18.2.0** - UI library
- **React Router DOM 6.20.0** - Client-side routing
- **React Context API** - State management for cart
- **CSS3** - Styling with responsive design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- User authentication and accounts
- Order history
- Product reviews and ratings
- Search functionality
- Advanced filtering options
- Email notifications
- Real payment integration
- Real-time inventory management

## License

This project is created for demonstration purposes.

## Contact

For questions or support, please refer to the project documentation or create an issue in the repository.

