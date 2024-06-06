import productController from './productController';
import orderController from './orderController';
import cartController from './cartController';

//Définition du contrôleur de tableau de bord
const dashboardController = {
  // Fonction pour récupérer les données nécessaires au tableau de bord
  getDashboardData: async (req, res) => {
    try {
      // Exemple d'appel à différents contrôleurs pour récupérer des données
      const products = await productController.getAllProducts();
      const users = await productController.getAllUsers();
      const orders = await orderController.getAllOrders();
      const cartItems = await cartController.getCartItems();

      // Regroupez les données comme nécessaire pour les envoyer au frontend
      const dashboardData = {
        users,
        products,
        orders,
        cartItems
      };

      res.json(dashboardData);
    } catch (error) {
      console.error('Error getting dashboard data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

};

module.exports = dashboardController;
