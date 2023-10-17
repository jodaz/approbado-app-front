export interface User {
    id:            number;
    names:         string;
    last_name:     null;
    user_name:     string;
    bio:           string;
    picture:       string;
    email:         string;
    rol:           null;
    is_registered: boolean;
    phone:         null;
    created_at:    Date;
    updated_at:    Date;
    verified_at:   Date;
    profile:       Profile;
    posts:         any[];
    discussion:    any[];
    comments:      any[];
    awards:        any[];
    memberships:   Membership[];
}

export interface Membership {
    id:         number;
    active:     boolean;
    plan_id:    number;
    user_id:    number;
    payment_id: number;
    created_at: Date;
    updated_at: Date;
    plans:      Plans;
}

export interface Plans {
    id:               number;
    name:             string;
    trivias_in_teams: number;
    duration:         number;
    forum_access:     boolean;
    amount:           number;
    created_at:       Date;
    updated_at:       Date;
}

export interface Profile {
    id:                              number;
    public_profile:                  boolean;
    points:                          null;
    show_name:                       boolean;
    show_terms_privacy:              boolean;
    names:                           null;
    surnames:                        null;
    username:                        null;
    summary:                         string;
    ocupation:                       string;
    linkedin:                        string;
    twitter:                         string;
    general_notifications:           boolean;
    showNotification_mobile_app:     boolean;
    showNotification_email:          boolean;
    showNotification_about_chat:     boolean;
    showNotification_about_comments: boolean;
    showNotification_about_account:  boolean;
    created_at:                      Date;
    updated_at:                      Date;
    user_id:                         number;
}
