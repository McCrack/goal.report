CREATE TABLE IF NOT EXISTS gb_orders(
	OrderID INT UNSIGNED NOT NULL AUTO_INCREMENT,
	UserID INT UNSIGNED,
	CommunityID INT UNSIGNED,
	created INT UNSIGNED NOT NULL DEFAULT 1,
	modified INT UNSIGNED NOT NULL DEFAULT 1,
	paid ENUM("NO","YES") NOT NULL DEFAULT "NO",
	status SET('new','accepted','shipped','canceled') NOT NULL DEFAULT 'new',
	price DECIMAL(8,2) NOT NULL DEFAULT '0.00',
	amount INT UNSIGNED NOT NULL DEFAULT 1,
	delivery VARCHAR(1024) NOT NULL DEFAULT '{
		"country":"",
		"city":"",
		"warehouse":"",
		"tracking":""
	}',
	log VARCHAR(4096) NOT NULL DEFAULT '',
	message VARCHAR(4096) NOT NULL DEFAULT '',
	signature VARCHAR(32) NOT NULL DEFAULT '',
	PRIMARY KEY(OrderID),
	FOREIGN KEY (CommunityID) REFERENCES gb_community(CommunityID)
		ON UPDATE CASCADE
		ON DELETE SET NULL,
	FOREIGN KEY (UserID) REFERENCES gb_staff(UserID)
		ON UPDATE CASCADE
		ON DELETE SET NULL
)ENGINE=InnoDB CHARACTER SET utf8;