<?php

// autoload_classmap.php @generated by Composer

$vendorDir = dirname(__DIR__);
$baseDir = dirname($vendorDir);

return array(
    'Composer\\InstalledVersions' => $vendorDir . '/composer/InstalledVersions.php',
    'permission\\SqlRepository' => $vendorDir . '/dotainion/query-permission/permission/SqlRepository.php',
    'permission\\database\\Column' => $vendorDir . '/dotainion/query-permission/permission/database/Column.php',
    'permission\\database\\Join' => $vendorDir . '/dotainion/query-permission/permission/database/Join.php',
    'permission\\database\\OrderBy' => $vendorDir . '/dotainion/query-permission/permission/database/OrderBy.php',
    'permission\\database\\Pagination' => $vendorDir . '/dotainion/query-permission/permission/database/Pagination.php',
    'permission\\database\\Permission' => $vendorDir . '/dotainion/query-permission/permission/database/Permission.php',
    'permission\\database\\Table' => $vendorDir . '/dotainion/query-permission/permission/database/Table.php',
    'permission\\database\\Where' => $vendorDir . '/dotainion/query-permission/permission/database/Where.php',
    'permission\\infrastructure\\Collector' => $vendorDir . '/dotainion/query-permission/permission/infrastructure/Collector.php',
    'permission\\infrastructure\\Factory' => $vendorDir . '/dotainion/query-permission/permission/infrastructure/Factory.php',
    'permission\\infrastructure\\IRepo' => $vendorDir . '/dotainion/query-permission/permission/infrastructure/IRepo.php',
    'permission\\infrastructure\\PermissionException' => $vendorDir . '/dotainion/query-permission/permission/infrastructure/PermissionException.php',
    'permission\\infrastructure\\RoleAttributes' => $vendorDir . '/dotainion/query-permission/permission/infrastructure/RoleAttributes.php',
    'permission\\infrastructure\\SqlId' => $vendorDir . '/dotainion/query-permission/permission/infrastructure/SqlId.php',
    'permission\\permission\\action\\PermissionRepository' => $vendorDir . '/dotainion/query-permission/permission/permisson/repository/PermissionRepository.php',
    'permission\\permission\\factory\\PermissionFactory' => $vendorDir . '/dotainion/query-permission/permission/permisson/factory/PermissionFactory.php',
    'permission\\permission\\logic\\ListPermission' => $vendorDir . '/dotainion/query-permission/permission/permisson/logic/ListPermission.php',
    'permission\\permission\\logic\\SavePermission' => $vendorDir . '/dotainion/query-permission/permission/permisson/logic/SavePermission.php',
    'permission\\permission\\objects\\IPermission' => $vendorDir . '/dotainion/query-permission/permission/permisson/objects/IPermission.php',
    'permission\\permission\\objects\\Permission' => $vendorDir . '/dotainion/query-permission/permission/permisson/objects/Permission.php',
    'permission\\role\\factory\\RoleFactory' => $vendorDir . '/dotainion/query-permission/permission/role/factory/RoleFactory.php',
    'permission\\role\\factory\\RolePermissionFactory' => $vendorDir . '/dotainion/query-permission/permission/role/factory/RolePermissionFactory.php',
    'permission\\role\\logic\\ListRole' => $vendorDir . '/dotainion/query-permission/permission/role/logic/ListRole.php',
    'permission\\role\\logic\\SetRole' => $vendorDir . '/dotainion/query-permission/permission/role/logic/SetRole.php',
    'permission\\role\\objects\\Role' => $vendorDir . '/dotainion/query-permission/permission/role/objects/Role.php',
    'permission\\role\\objects\\RolePermission' => $vendorDir . '/dotainion/query-permission/permission/role/objects/RolePermission.php',
    'permission\\role\\repository\\RolePermissionRepository' => $vendorDir . '/dotainion/query-permission/permission/role/repository/RolePermissionRepository.php',
    'permission\\role\\repository\\RoleRepository' => $vendorDir . '/dotainion/query-permission/permission/role/repository/RoleRepository.php',
    'permission\\role\\service\\ListRoleService' => $vendorDir . '/dotainion/query-permission/permission/role/service/ListRoleService.php',
    'permission\\role\\service\\SetRoleService' => $vendorDir . '/dotainion/query-permission/permission/role/service/SetRoleService.php',
    'permission\\schema\\Schema' => $vendorDir . '/dotainion/query-permission/permission/schema/Schema.php',
    'permission\\schema\\Table' => $vendorDir . '/dotainion/query-permission/permission/schema/Table.php',
    'permission\\schema\\Truncate' => $vendorDir . '/dotainion/query-permission/permission/schema/Truncate.php',
    'permission\\security\\Connection' => $vendorDir . '/dotainion/query-permission/permission/security/Connection.php',
    'permission\\security\\DbCredentials' => $vendorDir . '/dotainion/query-permission/permission/security/DbCredentials.php',
    'src\\infrastructure\\Repository' => $baseDir . '/src/infrastructure/Repository.php',
    'src\\infrastructure\\RolePermissionCheck' => $baseDir . '/src/infrastructure/RolePermissionCheck.php',
    'src\\infrastructure\\SearchRequest' => $baseDir . '/src/infrastructure/SearchRequest.php',
    'src\\infrastructure\\Service' => $baseDir . '/src/infrastructure/Service.php',
    'src\\infrastructure\\StringId' => $baseDir . '/src/infrastructure/StringId.php',
    'src\\module\\admin\\service\\SetupService' => $baseDir . '/src/module/admin/service/SetupService.php',
    'src\\module\\discounts\\action\\LinkDiscountToProductAction' => $baseDir . '/src/module/discounts/action/LinkDiscountToProductAction.php',
    'src\\module\\discounts\\action\\ListDiscountsAction' => $baseDir . '/src/module/discounts/action/ListDiscountsAction.php',
    'src\\module\\discounts\\action\\SetDiscountAction' => $baseDir . '/src/module/discounts/action/SetDiscountAction.php',
    'src\\module\\discounts\\factory\\DiscountFactory' => $baseDir . '/src/module/discounts/factory/DiscountFactory.php',
    'src\\module\\discounts\\factory\\DiscountLinkFactory' => $baseDir . '/src/module/discounts/factory/DiscountLinkFactory.php',
    'src\\module\\discounts\\logic\\ListDiscounts' => $baseDir . '/src/module/discounts/logic/ListDiscounts.php',
    'src\\module\\discounts\\logic\\SetDiscount' => $baseDir . '/src/module/discounts/logic/SetDiscount.php',
    'src\\module\\discounts\\logic\\SetDiscountLink' => $baseDir . '/src/module/discounts/logic/SetDiscountLink.php',
    'src\\module\\discounts\\objects\\Discount' => $baseDir . '/src/module/discounts/objects/Discount.php',
    'src\\module\\discounts\\objects\\DiscountLink' => $baseDir . '/src/module/discounts/objects/DiscountLink.php',
    'src\\module\\discounts\\repository\\DiscountLinkRepository' => $baseDir . '/src/module/discounts/repository/DiscountLinkRepository.php',
    'src\\module\\discounts\\repository\\DiscountRepository' => $baseDir . '/src/module/discounts/repository/DiscountRepository.php',
    'src\\module\\discounts\\service\\LinkDiscountToProductService' => $baseDir . '/src/module/discounts/service/LinkDiscountToProductService.php',
    'src\\module\\discounts\\service\\ListDiscountsService' => $baseDir . '/src/module/discounts/service/ListDiscountsService.php',
    'src\\module\\discounts\\service\\SetDiscountService' => $baseDir . '/src/module/discounts/service/SetDiscountService.php',
    'src\\module\\image\\action\\DeleteFileAction' => $baseDir . '/src/module/image/action/DeleteFileAction.php',
    'src\\module\\image\\action\\SetFileAsDefaultAction' => $baseDir . '/src/module/image/action/SetFileAsDefaultAction.php',
    'src\\module\\image\\action\\UpdateFileNameAction' => $baseDir . '/src/module/image/action/UpdateFileNameAction.php',
    'src\\module\\image\\action\\UploadFileAction' => $baseDir . '/src/module/image/action/UploadFileAction.php',
    'src\\module\\image\\factory\\ImageFactory' => $baseDir . '/src/module/image/factory/ImageFactory.php',
    'src\\module\\image\\logic\\DeleteImages' => $baseDir . '/src/module/image/logic/DeleteImages.php',
    'src\\module\\image\\logic\\FetchImage' => $baseDir . '/src/module/image/logic/FetchImage.php',
    'src\\module\\image\\logic\\ListImage' => $baseDir . '/src/module/image/logic/ListImage.php',
    'src\\module\\image\\logic\\SaveImage' => $baseDir . '/src/module/image/logic/SaveImage.php',
    'src\\module\\image\\objects\\Image' => $baseDir . '/src/module/image/objects/Image.php',
    'src\\module\\image\\repository\\ImageRepository' => $baseDir . '/src/module/image/repository/ImageRepository.php',
    'src\\module\\image\\service\\DeleteFileService' => $baseDir . '/src/module/image/service/DeleteFileService.php',
    'src\\module\\image\\service\\SetFileAsDefaultService' => $baseDir . '/src/module/image/service/SetFileAsDefaultService.php',
    'src\\module\\image\\service\\UpdateFileNameService' => $baseDir . '/src/module/image/service/UpdateFileNameService.php',
    'src\\module\\image\\service\\UploadFileService' => $baseDir . '/src/module/image/service/UploadFileService.php',
    'src\\module\\login\\action\\AuthVerificationAction' => $baseDir . '/src/module/login/action/AuthVerificationAction.php',
    'src\\module\\login\\action\\CreatePinLoginAction' => $baseDir . '/src/module/login/action/CreatePinLoginAction.php',
    'src\\module\\login\\action\\FetchSessionAction' => $baseDir . '/src/module/login/action/FetchSessionAction.php',
    'src\\module\\login\\action\\GoogleLoginAction' => $baseDir . '/src/module/login/action/GoogleLoginAction.php',
    'src\\module\\login\\action\\LoginAction' => $baseDir . '/src/module/login/action/LoginAction.php',
    'src\\module\\login\\action\\LogoutAction' => $baseDir . '/src/module/login/action/LogoutAction.php',
    'src\\module\\login\\action\\PinLoginAction' => $baseDir . '/src/module/login/action/PinLoginAction.php',
    'src\\module\\login\\action\\RestaurantToSessionAction' => $baseDir . '/src/module/login/action/RestaurantToSessionAction.php',
    'src\\module\\login\\action\\SendRecoveryEmailAction' => $baseDir . '/src/module/login/action/SendRecoveryEmailAction.php',
    'src\\module\\login\\action\\UpdateCredentialAction' => $baseDir . '/src/module/login/action/UpdateCredentialAction.php',
    'src\\module\\login\\action\\UpdateCredentialByTokenAction' => $baseDir . '/src/module/login/action/UpdateCredentialByTokenAction.php',
    'src\\module\\login\\service\\AuthVerificationService' => $baseDir . '/src/module/login/service/AuthVerificationService.php',
    'src\\module\\login\\service\\CreateCredentialService' => $baseDir . '/src/module/login/service/CreateCredentialService.php',
    'src\\module\\login\\service\\CreateGoogleCredentialService' => $baseDir . '/src/module/login/service/CreateGoogleCredentialService.php',
    'src\\module\\login\\service\\CreatePinCredentialService' => $baseDir . '/src/module/login/service/CreatePinCredentialService.php',
    'src\\module\\login\\service\\FetchSessionService' => $baseDir . '/src/module/login/service/FetchSessionService.php',
    'src\\module\\login\\service\\GoogleLoginService' => $baseDir . '/src/module/login/service/GoogleLoginService.php',
    'src\\module\\login\\service\\LoginService' => $baseDir . '/src/module/login/service/LoginService.php',
    'src\\module\\login\\service\\LogoutService' => $baseDir . '/src/module/login/service/LogoutService.php',
    'src\\module\\login\\service\\PinLoginService' => $baseDir . '/src/module/login/service/PinLoginService.php',
    'src\\module\\login\\service\\RestaurantToSessionService' => $baseDir . '/src/module/login/service/RestaurantToSessionService.php',
    'src\\module\\login\\service\\SendRecoverEmailService' => $baseDir . '/src/module/login/service/SendRecoverEmailService.php',
    'src\\module\\login\\service\\UpdateCredentialByTokenService' => $baseDir . '/src/module/login/service/UpdateCredentialByTokenService.php',
    'src\\module\\login\\service\\UpdateCredentialService' => $baseDir . '/src/module/login/service/UpdateCredentialService.php',
    'src\\module\\mail\\action\\SendMailAction' => $baseDir . '/src/module/mail/action/SendMailAction.php',
    'src\\module\\mail\\service\\SendMailService' => $baseDir . '/src/module/mail/service/SendMailService.php',
    'src\\module\\messages\\action\\ListCommunityMessagesAction' => $baseDir . '/src/module/messages/action/ListGroupMessagesAction.php',
    'src\\module\\messages\\action\\ListConversationAction' => $baseDir . '/src/module/messages/action/ListConversationAction.php',
    'src\\module\\messages\\action\\ListMessangersAction' => $baseDir . '/src/module/messages/action/ListMessangersAction.php',
    'src\\module\\messages\\action\\ListUnSeenMessagesAction' => $baseDir . '/src/module/messages/action/ListUnSeenMessagesAction.php',
    'src\\module\\messages\\action\\SearchMessangerAction' => $baseDir . '/src/module/messages/action/SearchMessangerAction.php',
    'src\\module\\messages\\action\\SetMessageAction' => $baseDir . '/src/module/messages/action/SetMessageAction.php',
    'src\\module\\messages\\factory\\MessageFactory' => $baseDir . '/src/module/messages/factory/MessageFactory.php',
    'src\\module\\messages\\logic\\AppendMessageUsers' => $baseDir . '/src/module/messages/logic/AppendMessageUsers.php',
    'src\\module\\messages\\logic\\ListMessages' => $baseDir . '/src/module/messages/logic/ListMessages.php',
    'src\\module\\messages\\logic\\SetMessage' => $baseDir . '/src/module/messages/logic/SetMessage.php',
    'src\\module\\messages\\objects\\Message' => $baseDir . '/src/module/messages/objects/Message.php',
    'src\\module\\messages\\objects\\Messanger' => $baseDir . '/src/module/messages/objects/Messanger.php',
    'src\\module\\messages\\repository\\MessageRepository' => $baseDir . '/src/module/messages/repository/MessageRepository.php',
    'src\\module\\messages\\service\\ListCommunityMessagesService' => $baseDir . '/src/module/messages/service/ListGroupMessagesService.php',
    'src\\module\\messages\\service\\ListConversationService' => $baseDir . '/src/module/messages/service/ListConversationService.php',
    'src\\module\\messages\\service\\ListMessangersService' => $baseDir . '/src/module/messages/service/ListMessangersService.php',
    'src\\module\\messages\\service\\ListUnSeenMessagesService' => $baseDir . '/src/module/messages/service/ListUnSeenMessagesService.php',
    'src\\module\\messages\\service\\SearchMessangerService' => $baseDir . '/src/module/messages/service/SearchMessangerService.php',
    'src\\module\\messages\\service\\SetMessageService' => $baseDir . '/src/module/messages/service/SetMessageService.php',
    'src\\module\\order\\action\\ListOrdersAction' => $baseDir . '/src/module/order/action/ListOrdersAction.php',
    'src\\module\\order\\action\\SetOrderAction' => $baseDir . '/src/module/order/action/SetOrderAction.php',
    'src\\module\\order\\action\\SetOrderDiscountAction' => $baseDir . '/src/module/order/action/SetOrderDiscountAction.php',
    'src\\module\\order\\action\\SetOrderProductAction' => $baseDir . '/src/module/order/action/SetOrderProductAction.php',
    'src\\module\\order\\factory\\DiscountOrderFactory' => $baseDir . '/src/module/order/factory/DiscountOrderFactory.php',
    'src\\module\\order\\factory\\OrderFactory' => $baseDir . '/src/module/order/factory/OrderFactory.php',
    'src\\module\\order\\factory\\ProductOrderFactory' => $baseDir . '/src/module/order/factory/ProductOrderFactory.php',
    'src\\module\\order\\logic\\ListDiscountOrder' => $baseDir . '/src/module/order/logic/ListDiscountOrder.php',
    'src\\module\\order\\logic\\ListOrders' => $baseDir . '/src/module/order/logic/ListOrders.php',
    'src\\module\\order\\logic\\ListProductOrder' => $baseDir . '/src/module/order/logic/ListProductOrder.php',
    'src\\module\\order\\logic\\OrderRequirements' => $baseDir . '/src/module/order/logic/OrderRequirements.php',
    'src\\module\\order\\logic\\SetDiscountOrder' => $baseDir . '/src/module/order/logic/SetDiscountOrder.php',
    'src\\module\\order\\logic\\SetOrder' => $baseDir . '/src/module/order/logic/SetOrder.php',
    'src\\module\\order\\logic\\SetProductOrder' => $baseDir . '/src/module/order/logic/SetProductOrder.php',
    'src\\module\\order\\objects\\DiscountOrder' => $baseDir . '/src/module/order/objects/DiscountOrder.php',
    'src\\module\\order\\objects\\DiscountType' => $baseDir . '/src/module/order/objects/DiscountType.php',
    'src\\module\\order\\objects\\Order' => $baseDir . '/src/module/order/objects/Order.php',
    'src\\module\\order\\objects\\OrderStatus' => $baseDir . '/src/module/order/objects/OrderStatus.php',
    'src\\module\\order\\objects\\Price' => $baseDir . '/src/module/order/objects/Price.php',
    'src\\module\\order\\objects\\ProductOrder' => $baseDir . '/src/module/order/objects/ProductOrder.php',
    'src\\module\\order\\repository\\DiscountOrderRepository' => $baseDir . '/src/module/order/repository/DiscountOrderRepository.php',
    'src\\module\\order\\repository\\OrderRepository' => $baseDir . '/src/module/order/repository/OrderRepository.php',
    'src\\module\\order\\repository\\ProductOrderRepository' => $baseDir . '/src/module/order/repository/ProductOrderRepository.php',
    'src\\module\\order\\service\\ListOrdersService' => $baseDir . '/src/module/order/service/ListOrdersService.php',
    'src\\module\\order\\service\\SetOrderDiscountService' => $baseDir . '/src/module/order/service/SetOrderDiscountService.php',
    'src\\module\\order\\service\\SetOrderProductService' => $baseDir . '/src/module/order/service/SetOrderProductService.php',
    'src\\module\\order\\service\\SetOrderService' => $baseDir . '/src/module/order/service/SetOrderService.php',
    'src\\module\\payment\\action\\CreatePaymentAction' => $baseDir . '/src/module/payment/action/CreatePaymentAction.php',
    'src\\module\\payment\\action\\ListPaymentsAction' => $baseDir . '/src/module/payment/action/ListPaymentsAction.php',
    'src\\module\\payment\\factory\\PaymentFactory' => $baseDir . '/src/module/payment/factory/PaymentFactory.php',
    'src\\module\\payment\\logic\\ListPayments' => $baseDir . '/src/module/payment/logic/ListPayments.php',
    'src\\module\\payment\\logic\\SetPayment' => $baseDir . '/src/module/payment/logic/SetPayment.php',
    'src\\module\\payment\\objects\\Payment' => $baseDir . '/src/module/payment/objects/Payment.php',
    'src\\module\\payment\\objects\\PaymentStatus' => $baseDir . '/src/module/payment/objects/PaymentStatus.php',
    'src\\module\\payment\\repository\\PaymentRepository' => $baseDir . '/src/module/payment/repository/PaymentRepository.php',
    'src\\module\\payment\\service\\CreatePaymentService' => $baseDir . '/src/module/payment/service/CreatePaymentService.php',
    'src\\module\\payment\\service\\ListPaymentsService' => $baseDir . '/src/module/payment/service/ListPaymentsService.php',
    'src\\module\\products\\action\\ListProductsAction' => $baseDir . '/src/module/products/action/ListProductsAction.php',
    'src\\module\\products\\action\\SetProductAction' => $baseDir . '/src/module/products/action/SetProductAction.php',
    'src\\module\\products\\factory\\ProductFactory' => $baseDir . '/src/module/products/factory/ProductFactory.php',
    'src\\module\\products\\logic\\ListProduct' => $baseDir . '/src/module/products/logic/ListProduct.php',
    'src\\module\\products\\logic\\SetProduct' => $baseDir . '/src/module/products/logic/SetProduct.php',
    'src\\module\\products\\objects\\Product' => $baseDir . '/src/module/products/objects/Product.php',
    'src\\module\\products\\repository\\ProductRepository' => $baseDir . '/src/module/products/repository/ProductRepository.php',
    'src\\module\\products\\service\\ListProductsService' => $baseDir . '/src/module/products/service/ListProductsService.php',
    'src\\module\\products\\service\\SetProductService' => $baseDir . '/src/module/products/service/SetProductService.php',
    'src\\module\\reservation\\action\\ListReservationsAction' => $baseDir . '/src/module/reservation/action/ListReservationsAction.php',
    'src\\module\\reservation\\action\\SetReservationAction' => $baseDir . '/src/module/reservation/action/SetReservationAction.php',
    'src\\module\\reservation\\factory\\ReservationFactory' => $baseDir . '/src/module/reservation/factory/ReservationFactory.php',
    'src\\module\\reservation\\logic\\ListReservation' => $baseDir . '/src/module/reservation/logic/ListReservation.php',
    'src\\module\\reservation\\logic\\SetReservation' => $baseDir . '/src/module/reservation/logic/SetReservation.php',
    'src\\module\\reservation\\objects\\Reservation' => $baseDir . '/src/module/reservation/objects/Reservation.php',
    'src\\module\\reservation\\repository\\ReservationRepository' => $baseDir . '/src/module/reservation/repository/ReservationRepository.php',
    'src\\module\\reservation\\service\\ListReservationsService' => $baseDir . '/src/module/reservation/service/ListReservationsService.php',
    'src\\module\\reservation\\service\\SetReservationService' => $baseDir . '/src/module/reservation/service/SetReservationService.php',
    'src\\module\\restaurant\\action\\LinkToRestaurantAction' => $baseDir . '/src/module/restaurant/action/LinkToRestaurantAction.php',
    'src\\module\\restaurant\\action\\ListRestaurantsAction' => $baseDir . '/src/module/restaurant/action/ListRestaurantsAction.php',
    'src\\module\\restaurant\\action\\SetRestaurantAction' => $baseDir . '/src/module/restaurant/action/SetRestaurantAction.php',
    'src\\module\\restaurant\\factory\\RestaurantFactory' => $baseDir . '/src/module/restaurant/factory/RestaurantFactory.php',
    'src\\module\\restaurant\\factory\\RestaurantLinkFactory' => $baseDir . '/src/module/restaurant/factory/RestaurantLinkFactory.php',
    'src\\module\\restaurant\\logic\\ListRestaurant' => $baseDir . '/src/module/restaurant/logic/ListRestaurant.php',
    'src\\module\\restaurant\\logic\\ListRestaurantLink' => $baseDir . '/src/module/restaurant/logic/ListRestaurantLink.php',
    'src\\module\\restaurant\\logic\\SetRestaurant' => $baseDir . '/src/module/restaurant/logic/SetRestaurant.php',
    'src\\module\\restaurant\\logic\\SetRestaurantLink' => $baseDir . '/src/module/restaurant/logic/SetRestaurantLink.php',
    'src\\module\\restaurant\\objects\\Restaurant' => $baseDir . '/src/module/restaurant/objects/Restaurant.php',
    'src\\module\\restaurant\\objects\\RestaurantLink' => $baseDir . '/src/module/restaurant/objects/RestaurantLink.php',
    'src\\module\\restaurant\\repository\\RestaurantLinkRepository' => $baseDir . '/src/module/restaurant/repository/RestaurantLinkRepository.php',
    'src\\module\\restaurant\\repository\\RestaurantRepository' => $baseDir . '/src/module/restaurant/repository/RestaurantRepository.php',
    'src\\module\\restaurant\\service\\LinkToRestaurantService' => $baseDir . '/src/module/restaurant/service/LinkToRestaurantService.php',
    'src\\module\\restaurant\\service\\ListRestaurantsService' => $baseDir . '/src/module/restaurant/service/ListRestaurantsService.php',
    'src\\module\\restaurant\\service\\SetRestaurantService' => $baseDir . '/src/module/restaurant/service/SetRestaurantService.php',
    'src\\module\\user\\action\\AssignRoleAction' => $baseDir . '/src/module/user/action/AssignRoleAction.php',
    'src\\module\\user\\action\\CreateGoogleUserAction' => $baseDir . '/src/module/user/action/CreateGoogleUserAction.php',
    'src\\module\\user\\action\\CreateUserAction' => $baseDir . '/src/module/user/action/CreateUserAction.php',
    'src\\module\\user\\action\\EditUserAction' => $baseDir . '/src/module/user/action/EditUserAction.php',
    'src\\module\\user\\action\\FetchAddressAction' => $baseDir . '/src/module/user/action/FetchAddressAction.php',
    'src\\module\\user\\action\\FetchUserAction' => $baseDir . '/src/module/user/action/FetchUserAction.php',
    'src\\module\\user\\action\\ListRolesAction' => $baseDir . '/src/module/user/action/ListRolesAction.php',
    'src\\module\\user\\action\\ListUsersAction' => $baseDir . '/src/module/user/action/ListUsersAction.php',
    'src\\module\\user\\action\\SearchUsersAction' => $baseDir . '/src/module/user/action/SearchUsersAction.php',
    'src\\module\\user\\action\\SetAddressAction' => $baseDir . '/src/module/user/action/SetAddressAction.php',
    'src\\module\\user\\action\\SetRoleAction' => $baseDir . '/src/module/user/action/SetRoleAction.php',
    'src\\module\\user\\factory\\AddressFactory' => $baseDir . '/src/module/user/factory/AddressFactory.php',
    'src\\module\\user\\factory\\RoleFactory' => $baseDir . '/src/module/user/factory/RoleFactory.php',
    'src\\module\\user\\factory\\UserFactory' => $baseDir . '/src/module/user/factory/UserFactory.php',
    'src\\module\\user\\logic\\AssignRole' => $baseDir . '/src/module/user/logic/AssignRole.php',
    'src\\module\\user\\logic\\CreateUser' => $baseDir . '/src/module/user/logic/CreateUser.php',
    'src\\module\\user\\logic\\EditUser' => $baseDir . '/src/module/user/logic/EditUser.php',
    'src\\module\\user\\logic\\FetchAddress' => $baseDir . '/src/module/user/logic/FetchAddress.php',
    'src\\module\\user\\logic\\FetchUser' => $baseDir . '/src/module/user/logic/FetchUser.php',
    'src\\module\\user\\logic\\ListRoles' => $baseDir . '/src/module/user/logic/ListRoles.php',
    'src\\module\\user\\logic\\ListUsers' => $baseDir . '/src/module/user/logic/ListUsers.php',
    'src\\module\\user\\logic\\SetAddress' => $baseDir . '/src/module/user/logic/SetAddress.php',
    'src\\module\\user\\logic\\SetRole' => $baseDir . '/src/module/user/logic/SetRole.php',
    'src\\module\\user\\objects\\Address' => $baseDir . '/src/module/user/objects/Address.php',
    'src\\module\\user\\objects\\Role' => $baseDir . '/src/module/user/objects/Role.php',
    'src\\module\\user\\objects\\User' => $baseDir . '/src/module/user/objects/User.php',
    'src\\module\\user\\repository\\AddressRepository' => $baseDir . '/src/module/user/repository/AddressRepository.php',
    'src\\module\\user\\repository\\RoleRepository' => $baseDir . '/src/module/user/repository/RoleRepository.php',
    'src\\module\\user\\repository\\UserRepository' => $baseDir . '/src/module/user/repository/UserRepository.php',
    'src\\module\\user\\service\\AssignRoleService' => $baseDir . '/src/module/user/service/AssignRoleService.php',
    'src\\module\\user\\service\\CreateGoogleUserService' => $baseDir . '/src/module/user/service/CreateGoogleUserService.php',
    'src\\module\\user\\service\\CreateUserService' => $baseDir . '/src/module/user/service/CreateUserService.php',
    'src\\module\\user\\service\\EditUserService' => $baseDir . '/src/module/user/service/EditUserService.php',
    'src\\module\\user\\service\\FetchAddressService' => $baseDir . '/src/module/user/service/FetchAddressService.php',
    'src\\module\\user\\service\\FetchUserService' => $baseDir . '/src/module/user/service/FetchUserService.php',
    'src\\module\\user\\service\\ListRolesService' => $baseDir . '/src/module/user/service/ListRolesService.php',
    'src\\module\\user\\service\\ListUsersService' => $baseDir . '/src/module/user/service/ListUsersService.php',
    'src\\module\\user\\service\\SearchUsersService' => $baseDir . '/src/module/user/service/SearchUsersService.php',
    'src\\module\\user\\service\\SetAddressService' => $baseDir . '/src/module/user/service/SetAddressService.php',
    'src\\module\\user\\service\\SetRoleService' => $baseDir . '/src/module/user/service/SetRoleService.php',
    'src\\router\\Router' => $baseDir . '/src/router/Router.php',
    'src\\schema\\Schema' => $baseDir . '/src/schema/Schema.php',
    'tools\\SecurityTools' => $vendorDir . '/dotainion/security-tools/tools/SecurityTools.php',
    'tools\\infrastructure\\ApiRequest' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/ApiRequest.php',
    'tools\\infrastructure\\Assert' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/Assert.php',
    'tools\\infrastructure\\BBCode' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/BBCode.php',
    'tools\\infrastructure\\ChainError' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/ChainError.php',
    'tools\\infrastructure\\Collector' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/Collector.php',
    'tools\\infrastructure\\DateHelper' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/DateHelper.php',
    'tools\\infrastructure\\Email' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/Email.php',
    'tools\\infrastructure\\Env' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/Env.php',
    'tools\\infrastructure\\ErrorMetaData' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/ErrorMetaData.php',
    'tools\\infrastructure\\Factory' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/Factory.php',
    'tools\\infrastructure\\Https' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/Https.php',
    'tools\\infrastructure\\IAction' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/IAction.php',
    'tools\\infrastructure\\ICredential' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/ICredential.php',
    'tools\\infrastructure\\ICustomer' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/ICustomer.php',
    'tools\\infrastructure\\IFactory' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/IFactory.php',
    'tools\\infrastructure\\IId' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/IId.php',
    'tools\\infrastructure\\IIdentifier' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/IIdentifier.php',
    'tools\\infrastructure\\IObjects' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/IObjects.php',
    'tools\\infrastructure\\IUser' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/IUser.php',
    'tools\\infrastructure\\Id' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/Id.php',
    'tools\\infrastructure\\ImageHelper' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/ImageHelper.php',
    'tools\\infrastructure\\NumberHelper' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/NumberHelper.php',
    'tools\\infrastructure\\Pagination' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/Pagination.php',
    'tools\\infrastructure\\ParseConfig' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/ParseConfig.php',
    'tools\\infrastructure\\Password' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/Password.php',
    'tools\\infrastructure\\Period' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/Period.php',
    'tools\\infrastructure\\Phone' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/Phone.php',
    'tools\\infrastructure\\Pin' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/Pin.php',
    'tools\\infrastructure\\PinPassword' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/PinPassword.php',
    'tools\\infrastructure\\Repository' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/Repository.php',
    'tools\\infrastructure\\Request' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/Request.php',
    'tools\\infrastructure\\SearchRequest' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/SearchRequest.php',
    'tools\\infrastructure\\SendMail' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/SendMail.php',
    'tools\\infrastructure\\Service' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/Service.php',
    'tools\\infrastructure\\StatusCode' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/StatusCode.php',
    'tools\\infrastructure\\TaxHelper' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/TaxHelper.php',
    'tools\\infrastructure\\Token' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/Token.php',
    'tools\\infrastructure\\exeptions\\InvalidRequirementException' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/exeptions/InvalidRequirementException.php',
    'tools\\infrastructure\\exeptions\\NoResultsException' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/exeptions/NoResultsException.php',
    'tools\\infrastructure\\exeptions\\NotAuthenticatedException' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/exeptions/NotAuthenticatedException.php',
    'tools\\infrastructure\\exeptions\\TokenExpiredException' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/exeptions/TokenExpiredException.php',
    'tools\\infrastructure\\exeptions\\UrlNotFoundException' => $vendorDir . '/dotainion/security-tools/tools/infrastructure/exeptions/UrlNotFoundException.php',
    'tools\\module\\login\\factory\\CredentialFactory' => $vendorDir . '/dotainion/security-tools/tools/module/login/factory/CredentialFactory.php',
    'tools\\module\\login\\logic\\CreateCredential' => $vendorDir . '/dotainion/security-tools/tools/module/login/logic/CreateCredential.php',
    'tools\\module\\login\\logic\\SendMessage' => $vendorDir . '/dotainion/security-tools/tools/module/messages/logic/SendMessage.php',
    'tools\\module\\login\\logic\\UpdateCredential' => $vendorDir . '/dotainion/security-tools/tools/module/login/logic/UpdateCredential.php',
    'tools\\module\\login\\objects\\Credential' => $vendorDir . '/dotainion/security-tools/tools/module/login/objects/Credential.php',
    'tools\\module\\login\\repository\\CredentialRepository' => $vendorDir . '/dotainion/security-tools/tools/module/login/repository/CredentialRepository.php',
    'tools\\module\\login\\service\\AuthVerificationService' => $vendorDir . '/dotainion/security-tools/tools/module/login/service/AuthVerificationService.php',
    'tools\\module\\login\\service\\CreateCredentialService' => $vendorDir . '/dotainion/security-tools/tools/module/login/service/CreateCredentialService.php',
    'tools\\module\\login\\service\\CreateGoogleCredentialService' => $vendorDir . '/dotainion/security-tools/tools/module/login/service/CreateGoogleCredentialService.php',
    'tools\\module\\login\\service\\CreatePinCredentialService' => $vendorDir . '/dotainion/security-tools/tools/module/login/service/CreatePinCredentialService.php',
    'tools\\module\\login\\service\\FetchSessionService' => $vendorDir . '/dotainion/security-tools/tools/module/login/service/FetchSessionService.php',
    'tools\\module\\login\\service\\GoogleLoginService' => $vendorDir . '/dotainion/security-tools/tools/module/login/service/GoogleLoginService.php',
    'tools\\module\\login\\service\\LoginService' => $vendorDir . '/dotainion/security-tools/tools/module/login/service/LoginService.php',
    'tools\\module\\login\\service\\LogoutService' => $vendorDir . '/dotainion/security-tools/tools/module/login/service/LogoutService.php',
    'tools\\module\\login\\service\\PinLoginService' => $vendorDir . '/dotainion/security-tools/tools/module/login/service/PinLoginService.php',
    'tools\\module\\login\\service\\SendMessageService' => $vendorDir . '/dotainion/security-tools/tools/module/messages/service/SendMessageService.php',
    'tools\\module\\login\\service\\SendRecoverEmailService' => $vendorDir . '/dotainion/security-tools/tools/module/login/service/SendRecoverEmailService.php',
    'tools\\module\\login\\service\\UpdateCredentialByTokenService' => $vendorDir . '/dotainion/security-tools/tools/module/login/service/UpdateCredentialByTokenService.php',
    'tools\\module\\login\\service\\UpdateCredentialService' => $vendorDir . '/dotainion/security-tools/tools/module/login/service/UpdateCredentialService.php',
    'tools\\module\\mail\\factory\\AttatchmentFactory' => $vendorDir . '/dotainion/security-tools/tools/module/mail/factory/AttatchmentFactory.php',
    'tools\\module\\mail\\factory\\MailFactory' => $vendorDir . '/dotainion/security-tools/tools/module/mail/factory/MailFactory.php',
    'tools\\module\\mail\\factory\\RecipientFactory' => $vendorDir . '/dotainion/security-tools/tools/module/mail/factory/RecipientFactory.php',
    'tools\\module\\mail\\logic\\RecoveryTemplate' => $vendorDir . '/dotainion/security-tools/tools/module/mail/logic/RecoveryTemplate.php',
    'tools\\module\\mail\\objects\\Attatchment' => $vendorDir . '/dotainion/security-tools/tools/module/mail/objects/Attatchment.php',
    'tools\\module\\mail\\objects\\Mail' => $vendorDir . '/dotainion/security-tools/tools/module/mail/objects/Mail.php',
    'tools\\module\\mail\\objects\\Recipient' => $vendorDir . '/dotainion/security-tools/tools/module/mail/objects/Recipient.php',
    'tools\\module\\mail\\service\\SendMailService' => $vendorDir . '/dotainion/security-tools/tools/module/mail/service/SendMailService.php',
    'tools\\schema\\Schema' => $vendorDir . '/dotainion/security-tools/tools/schema/Schema.php',
    'tools\\security\\Login' => $vendorDir . '/dotainion/security-tools/tools/security/Login.php',
    'tools\\security\\Logout' => $vendorDir . '/dotainion/security-tools/tools/security/Logout.php',
    'tools\\security\\PasswordTrait' => $vendorDir . '/dotainion/security-tools/tools/security/PasswordTrait.php',
    'tools\\security\\Security' => $vendorDir . '/dotainion/security-tools/tools/security/Security.php',
    'tools\\security\\SecurityFactory' => $vendorDir . '/dotainion/security-tools/tools/security/SecurityFactory.php',
    'tools\\security\\SecurityManager' => $vendorDir . '/dotainion/security-tools/tools/security/SecurityManager.php',
    'tools\\security\\SecurityRepository' => $vendorDir . '/dotainion/security-tools/tools/security/SecurityRepository.php',
    'tools\\security\\Session' => $vendorDir . '/dotainion/security-tools/tools/security/Session.php',
    'tools\\security\\Setup' => $vendorDir . '/dotainion/security-tools/tools/security/Setup.php',
    'tools\\security\\ValidatePassword' => $vendorDir . '/dotainion/security-tools/tools/security/ValidatePassword.php',
    'tools\\stripe\\StripeCustomer' => $vendorDir . '/dotainion/security-tools/tools/stripe/StripeCustomer.php',
    'tools\\stripe\\StripePayment' => $vendorDir . '/dotainion/security-tools/tools/stripe/StripeConnect.php',
    'tools\\stripe\\StripeRefund' => $vendorDir . '/dotainion/security-tools/tools/stripe/StripeRefund.php',
);
