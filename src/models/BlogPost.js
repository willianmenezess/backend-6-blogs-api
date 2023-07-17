const BlogPostSchema = (sequelize, DataTypes) => {
	BlogPostTable = sequelize.define('BlogPost', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		title: DataTypes.STRING,
		content: DataTypes.STRING,
		userId: {
			type: DataTypes.INTEGER,
			foreignKey: true,
		},
		published: {
			type: DataTypes.DATE,
			// field: 'published',
		},
		updated: {
			type: DataTypes.DATE,
			// field: 'updated',
		}
	}, {
		timestamps: true,
		underscored: true,
		tableName: 'blog_posts',
	});

	BlogPostTable.associate = (models) => {
		BlogPostTable.belongsTo(models.User, {
			as: 'user',
			foreignKey: 'userId',
		});
	};
	
	return BlogPostTable;
}

module.exports = BlogPostSchema;