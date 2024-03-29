export enum Status {
    Accepted = "accepted",
    Pending = "pending",
}

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
    awards:        Award[];
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

export interface Post {
    id:            number;
    message:       string;
    summary:       string;
    type:          string;
    created_by:    number;
    parent_id:     null;
    created_at:    Date;
    updated_at:    null;
    deleted_at:    null;
    commentsCount: string;
    owner:         Owner;
    categories:    Category[];
    trivias:       Trivia[];
}

export interface Category {
    id:         number;
    name:       string;
    triviasCount: number;
    created_at: Date;
    updated_at: null;
}

export interface Owner {
    id:            number;
    names:         string;
    last_name:     string;
    user_name:     string;
    bio:           string;
    picture:       string;
    email:         string;
    rol:           null;
    is_registered: boolean;
    phone:         string;
    created_at:    Date;
    updated_at:    Date;
    verified_at:   null;
}

export interface Chat {
    id:           number;
    name:         null;
    is_private:   boolean;
    created_at:   string;
    updated_at:   null;
    participants: Participant[];
    messages:     Message[];
    notification: Notification;
}

export interface Message {
    id:         number;
    message:    string;
    file?:       string;
    user_id:    number;
    chat_id:    number;
    read_at:    null;
    created_at: string;
    updated_at: null;
    user:       Participant;
}

export interface Participant extends Owner {
  status:        string;
}

export interface Trivia {
    id:                  number;
    name:                string;
    cover:               null;
    is_free:             boolean;
    grant_certification: boolean;
    category_id:         number;
    created_at:          string;
    updated_at:          null;
    subthemesCount?:      string;
    filesCount?:          string;
}

export interface Notification {
    id:            number;
    data:          string;
    long_data:     string;
    type:          string;
    created_by:    number;
    chat_id:       number;
    post_id:       null;
    membership_id: null;
    created_at:    string;
    updated_at:    null;
}

export interface ReportReason {
    id:         number;
    item:       string;
    created_at: string;
    updated_at: null;
}

export interface File {
    id:          number;
    title:       string;
    file:        string;
    size:        string;
    subtheme_id: number;
    created_at:  string;
    updated_at:  null;
}

export interface Award {
    id:             number;
    file:           string;
    icon_winner:    string;
    title:          string;
    min_points:     number;
    type:           string;
    trivia_id:      number;
    created_at:     string;
    updated_at:     null;
    subthemesCount: string;
    subthemes?:      Subtheme[];
}

export interface Subtheme {
    id:         number;
    name:       string;
    duration:   number;
    trivia_id:  number;
    award_id:   number;
    created_at: string;
    updated_at: string;
    finished?: boolean;
}

export interface Level {
    id:         number;
    name:       string;
    color:      null;
    created_at: string;
    updated_at: string | null;
}

export interface Schedule {
    id:            number;
    title:         string;
    description:   string;
    share_link:    string | null;
    finished:      boolean;
    notify_before: boolean;
    level_id:      number;
    created_by:    number;
    subtheme_id:   number;
    created_at:    string;
    updated_at:    string | null;
    starts_at:     string;
    participants:  Participant[];
    subtheme?:      Subtheme;
    level?:         Level;
    users_ids?:     Participant[];
    trivia?:        Trivia;
}

export interface ChatUser {
    id:         number;
    user_id:    number;
    chat_id:    number;
    status:     Status;
    created_at: null;
    updated_at: null | string;
}

export interface Question {
    id:               number;
    num:              null;
    description:      string;
    explanation:      string;
    explanation_type: boolean;
    subtheme_id:      number | null;
    level_id:         number;
    trivia_id:        number | null;
    file_id:          number;
    created_at:       string;
    updated_at:       null;
    options:          Option[];
}

export interface Option {
    id:          number;
    statement:   string;
    is_right:    boolean;
    question_id: number;
    created_at:  string;
    updated_at:  null;
}
