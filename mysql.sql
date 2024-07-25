/*
Created		2024-07-25
Modified		2024-07-25
Project		
Model		
Company		
Author		
Version		
Database		mySQL 8 
*/


Create table tbCustomer (
	name Varchar(20) NOT NULL,
	cutomerID Varchar(20) NOT NULL,
	customerPassword Int NOT NULL,
 Primary Key (cutomerID)) ENGINE = MyISAM;

Create table tbBooks (
	bookID Varchar(20) NOT NULL,
	bookName Varchar(20) NOT NULL,
	author Varchar(20) NOT NULL,
	price Int NOT NULL,
	stock Int NOT NULL,
	url Varchar(255) NOT NULL,
 Primary Key (bookID)) ENGINE = MyISAM;

Create table tbOrders (
	orderNum Int NOT NULL,
	tbCustomer_ID Varchar(20) NOT NULL,
	postNum Int,
	address Varchar(255),
	detailAddress Varchar(255),
	orderDate Datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(),
	creaditNum Varchar(20),
	creditDate Varchar(20),
	creaditkinds Varchar(20),
 Primary Key (orderNum)) ENGINE = MyISAM;

Create table tbAddress (
	ID Int NOT NULL,
	address Varchar(255),
	detailAddress Varchar(255),
	addressNum Int,
 Primary Key (ID)) ENGINE = MyISAM;

Create table tbOrderDetail (
	tbOrders_ID Int NOT NULL,
	tbBooks_ID Varchar(20) NOT NULL,
	totalStock Int NOT NULL,
 Primary Key (tbOrders_ID,tbBooks_ID)) ENGINE = MyISAM;

Create table tbBasket (
	BasketID Varchar(20) NOT NULL,
	cutomerID Varchar(20) NOT NULL,
	Baskettime Datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(),
 Primary Key (BasketID)) ENGINE = MyISAM;

Create table tbdetailBasket (
	BasketID Varchar(20) NOT NULL,
	bookID Varchar(20) NOT NULL,
	booksum Int NOT NULL,
 Primary Key (BasketID,bookID)) ENGINE = MyISAM;

Create table tbcreditcard (
	creditCardNum Varchar(20) NOT NULL,
	creaditcardDate Varchar(20) NOT NULL,
	creaditCardkinds Varchar(20) NOT NULL,
	cutomerID Varchar(20) NOT NULL,
 Primary Key (creditCardNum)) ENGINE = MyISAM;

Create table tbCustomerAddress (
	ID Int NOT NULL,
	cutomerID Varchar(20) NOT NULL,
 Primary Key (ID,cutomerID)) ENGINE = MyISAM;


Alter table tbOrders add Foreign Key (tbCustomer_ID) references tbCustomer (cutomerID) on delete  restrict on update  restrict;
Alter table tbcreditcard add Foreign Key (cutomerID) references tbCustomer (cutomerID) on delete  restrict on update  restrict;
Alter table tbBasket add Foreign Key (cutomerID) references tbCustomer (cutomerID) on delete  restrict on update  restrict;
Alter table tbCustomerAddress add Foreign Key (cutomerID) references tbCustomer (cutomerID) on delete  restrict on update  restrict;
Alter table tbOrderDetail add Foreign Key (tbBooks_ID) references tbBooks (bookID) on delete  restrict on update  restrict;
Alter table tbdetailBasket add Foreign Key (bookID) references tbBooks (bookID) on delete  restrict on update  restrict;
Alter table tbOrderDetail add Foreign Key (tbOrders_ID) references tbOrders (orderNum) on delete  restrict on update  restrict;
Alter table tbCustomerAddress add Foreign Key (ID) references tbAddress (ID) on delete  restrict on update  restrict;
Alter table tbdetailBasket add Foreign Key (BasketID) references tbBasket (BasketID) on delete  restrict on update  restrict;