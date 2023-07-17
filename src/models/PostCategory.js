const PostCategorySchema = (sequelize, DataTypes) => {
	const PostCategoryTable = sequelize.define('PostCategory', {
		postId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
		},
		categoryId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
		},
	}, {
		timestamps: false,
		underscored: true,
		tableName: 'posts_categories',
	});
  
	PostCategoryTable.associate = ({ BlogPost, Category }) => {
    BlogPost.belongsToMany(Category, {
      as: 'categories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
      through: PostCategoryTable,
    });

    Category.belongsToMany(BlogPost, {
      as: 'blogPosts',
      foreignKey: 'categoryId',
      otherKey: 'postId',
      through: PostCategoryTable,
    });
  };
	return PostCategoryTable;
};

module.exports = PostCategorySchema;
