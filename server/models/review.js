
export default (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    entry: {
      type: DataTypes.STRING,
      allowNull: false
    },
    by: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };
  return Review;
};
