const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		displayName: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		image: DataTypes.STRING,
	}, {
		timestamps: false,
		underscored: true,
		tableName: 'users',
	});

	UserTable.associate = (models) => {
		UserTable.hasMany(models.BlogPost, {
			as: 'blogPosts',
			foreignKey: 'userId',
		});
	};
	
  return UserTable;
}

module.exports = UserSchema;