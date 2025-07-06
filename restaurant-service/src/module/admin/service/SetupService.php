<?php
namespace src\module\admin\service;

use src\infrastructure\Repository;
use src\infrastructure\Service;
use src\module\login\service\CreatePinCredentialService;
use src\module\restaurant\service\LinkToRestaurantService;
use src\module\restaurant\service\SetRestaurantService;
use src\module\user\service\AssignRoleService;
use src\module\user\service\CreateUserService;
use src\module\user\service\SetRoleService;
use tools\infrastructure\Id;

class SetupService extends Service{

    public function __construct(){
        parent::__construct(false);
    }
    
    public function process(){
        Repository::preventRequirementChecks(true);
        $service = (new CreateUserService())->process(
            'Admin', 
            'Administrator', 
            'example@example.com', 
            '', 
            'Male', 
            'User1234#', 
            'User1234#',
            null
        );
        $userId = $service->output()->first()['id'];
        $roles = [
            [
                'name' => 'Administrator',
                'role' => 'admin',
                'details' => 'Full access to all system features, settings, and data. Can manage users, assign roles, configure pages, and perform critical actions.',
                'read' => true, 
                'write' => true, 
                'edit' => true, 
                'delete' => true 
            ],[
                'name' => 'Supervisor',
                'role' => 'supervisor',
                'details' => 'High-level access to operational areas such as orders, reservations, dashboards, and reports. Can oversee staff activity and review performance metrics.',
                'read' => true, 
                'write' => true, 
                'edit' => true, 
                'delete' => true 
            ],[
                'name' => 'Staff',
                'role' => 'staff',
                'details' => 'Limited access to core functionalities like managing orders and reservations. Typically used by operational team members performing day-to-day tasks.',
                'read' => true, 
                'write' => true, 
                'edit' => true, 
                'delete' => true 
            ],[
                'name' => 'Viewer',
                'role' => 'viewer',
                'details' => 'Read-only access to pages such as the dashboard and reports. Cannot perform any actions or modifications. Ideal for auditors or observers.',
                'read' => true, 
                'write' => true, 
                'edit' => true, 
                'delete' => true 
            ],[
                'name' => 'Guest',
                'role' => 'guest',
                'details' => 'Minimal access, usually restricted to publicly viewable or informational pages. Cannot interact with or modify any content.',
                'read' => true, 
                'write' => true, 
                'edit' => true, 
                'delete' => true 
            ]
        ];
        $roleId = null;
        foreach($roles as $i => $role){
            $id = (new Id())->new()->toString();
            if($roleId === null){
                $roleId = $id;
            }
            (new SetRoleService(false))->process(
                $id, 
                $role['name'], 
                $role['role'], 
                $role['details'], 
                $role['read'], 
                $role['write'], 
                $role['edit'], 
                $role['delete'], 
                $role['hide']
            );
        }
        (new AssignRoleService(false))->process($roleId, $userId);

        $restaurantId = (new Id())->new()->toString();
        (new SetRestaurantService(false))->process(
            $restaurantId, // $id
            'Crimson Deck', // $name
            'Seaside Dining & Bar', // $tagline
            'uploads/logos/crimson-deck-logo.png', // $logoRef
            true, // $isActive
            '+1 (473) 555-9876', // $phone
            'info@crimsondeck.com', // $email
            null, // $addressId
            'Caribbean', // $cuisine
            'Bar & Grill', // $category
            4.6, // $rating
            'Monday to Friday, 2:00 PM – 3:00 PM', // $openingHours
            '$$' // $priceRange
        );

        (new LinkToRestaurantService(false))->process($userId, $restaurantId);
        (new CreatePinCredentialService())->process($userId, '1234');
        
        Repository::preventRequirementChecks(false);
        return $this;
    }
}