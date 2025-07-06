<?php
namespace src\router;

use src\infrastructure\Repository;
use src\module\admin\service\SetupService;
use src\module\discounts\action\LinkDiscountToProductAction;
use src\module\discounts\action\ListDiscountsAction;
use src\module\discounts\action\SetDiscountAction;
use src\module\login\action\AuthVerificationAction;
use src\module\login\action\CreatePinLoginAction;
use tools\infrastructure\Https;
use src\module\login\action\FetchSessionAction;
use src\module\login\action\GoogleLoginAction;
use src\module\login\action\LoginAction;
use src\module\login\action\LogoutAction;
use src\module\login\action\PinLoginAction;
use src\module\login\action\RestaurantToSessionAction;
use src\module\login\action\SendRecoveryEmailAction;
use src\module\login\action\UpdateCredentialAction;
use src\module\login\action\UpdateCredentialByTokenAction;
use src\module\login\service\CreatePinCredentialService;
use src\module\mail\action\SendMailAction;
use src\module\messages\action\ListConversationAction;
use src\module\messages\action\ListCommunityMessagesAction;
use src\module\messages\action\ListMessangersAction;
use src\module\messages\action\ListUnSeenMessagesAction;
use src\module\messages\action\SearchMessangerAction;
use src\module\messages\action\SetMessageAction;
use src\module\order\action\ListOrdersAction;
use src\module\order\action\SetOrderAction;
use src\module\order\action\SetOrderDiscountAction;
use src\module\order\action\SetOrderProductAction;
use src\module\payment\action\CreatePaymentAction;
use src\module\payment\action\ListPaymentsAction;
use src\module\products\action\ListProductsAction;
use src\module\products\action\SetProductAction;
use src\module\reservation\action\ListReservationsAction;
use src\module\reservation\action\SetReservationAction;
use src\module\restaurant\action\ListRestaurantsAction;
use src\module\restaurant\action\SetRestaurantAction;
use src\module\user\action\AssignRoleAction;
use src\module\user\action\CreateGoogleUserAction;
use src\module\user\action\CreateUserAction;
use src\module\user\action\EditUserAction;
use src\module\user\action\FetchUserAction;
use src\module\user\action\ListUsersAction;
use src\schema\Schema;
use src\module\user\action\FetchAddressAction;
use src\module\user\action\ListRolesAction;
use src\module\user\action\SearchUsersAction;
use src\module\user\action\SetAddressAction;
use src\module\user\action\SetRoleAction;
use src\module\user\service\AssignRoleService;
use tools\security\Setup;

class Router{
    protected Https $request;

    public function __construct($baseName){
        $this->request = new Https($baseName);
    }

    public function request(){
        return $this->request;
    }

    public function load(){
        $this->request->route('/schema', function ($req){
            var_dump('Running schema...');
            $query = new Schema();
            $query->run();
            var_dump('Schema completed...');
        });

        /*$this->request->route('/truncate', function ($req){
            $query = new Truncate();
            $query->run();
        });*/

        $this->request->route('/setup', function ($req){
            var_dump('Runing setup...');
            (new SetupService())->process();
            var_dump('Setup complete...');
        });

        $this->request->route('/test', function ($req){
            Setup::jointSecurityTableWithPermissionOff();
            (new CreatePinCredentialService())->process('243cdb6c-ea53-4d15-9c74-cc8bca185b0f', '1234');
        });

        $this->request->route('/signin', function ($req){
            return new LoginAction();
        });

        $this->request->route('/pin/signin', function ($req){
            return new PinLoginAction();
        });

        $this->request->route('/auth/verification', function ($req){
            return new AuthVerificationAction();
        });

        $this->request->route('/google/signin', function ($req){
            return new GoogleLoginAction();
        });

        $this->request->route('/logout', function ($req){
            return new LogoutAction();
        });

        $this->request->route('/fetch/session', function ($req){
            return new FetchSessionAction();
        });

        $this->request->route('/create/pin/credential', function ($req){
            return new CreatePinLoginAction();
        });

        $this->request->route('/update/credential', function ($req){
            return new UpdateCredentialAction();
        });

        $this->request->route('/recover/account', function ($req){
            return new SendRecoveryEmailAction();
        });

        $this->request->route('/list/users', function ($req){
            return new ListUsersAction();
        });

        $this->request->route('/create/user', function ($req){
            return new CreateUserAction();
        });

        $this->request->route('/create/google/user', function ($req){
            return new CreateGoogleUserAction();
        });

        $this->request->route('/edit/user', function ($req){
            return new EditUserAction();
        });

        $this->request->route('/fetch/user', function ($req){
            return new FetchUserAction();
        });

        $this->request->route('/search/users', function ($req){
            return new SearchUsersAction();
        });

        $this->request->route('/set/address', function ($req){
            return new SetAddressAction();
        });

        $this->request->route('/fetch/address', function ($req){
            return new FetchAddressAction();
        });

        $this->request->route('/update/credential/with/refersh/token', function ($req){
            return new UpdateCredentialByTokenAction();
        });

        $this->request->route('/messanger/search', function ($req){
            return new SearchMessangerAction();
        });

        $this->request->route('/set/message', function ($req){
            return new SetMessageAction();
        });

        $this->request->route('/member/conversation', function ($req){
            return new ListConversationAction();
        });

        $this->request->route('/community/conversation', function ($req){
            return new ListCommunityMessagesAction();
        });

        $this->request->route('/list/messangers', function ($req){
            return new ListMessangersAction();
        });

        $this->request->route('/list/unseen/messages', function ($req){
            return new ListUnSeenMessagesAction();
        });

        $this->request->route('/send/mail', function ($req){
            return new SendMailAction();
        });

        $this->request->route('/set/role', function ($req){
            return new SetRoleAction();
        });

        $this->request->route('/list/roles', function ($req){
            return new ListRolesAction();
        });

        $this->request->route('/assign/role', function ($req){
            return new AssignRoleAction();
        });

        $this->request->route('/set/product', function ($req){
            return new SetProductAction();
        });

        $this->request->route('/list/products', function ($req){
            return new ListProductsAction();
        });

        $this->request->route('/set/order', function ($req){
            return new SetOrderAction();
        });

        $this->request->route('/set/to/cart', function ($req){
            return new SetOrderProductAction();
        });

        $this->request->route('/set/discount/to/cart', function ($req){
            return new SetOrderDiscountAction();
        });

        $this->request->route('/list/orders', function ($req){
            return new ListOrdersAction();
        });

        $this->request->route('/set/reservation', function ($req){
            return new SetReservationAction();
        });

        $this->request->route('/list/reservations', function ($req){
            return new ListReservationsAction();
        });

        $this->request->route('/set/restaurant', function ($req){
            return new SetRestaurantAction();
        });

        $this->request->route('/list/restaurants', function ($req){
            return new ListRestaurantsAction();
        });

        $this->request->route('/assign/to/session', function ($req){
            return new RestaurantToSessionAction();
        });

        $this->request->route('/set/discounts', function ($req){
            return new SetDiscountAction();
        });

        $this->request->route('/list/discounts', function ($req){
            return new ListDiscountsAction();
        });

        $this->request->route('/link/discount/to/product', function ($req){
            return new LinkDiscountToProductAction();
        });

        $this->request->route('/create/payment', function ($req){
            return new CreatePaymentAction();
        });

        $this->request->route('/list/payment', function ($req){
            return new ListPaymentsAction();
        });
    }

    public function execute(){
        $this->request->__INIT__();
    }
}

?>
