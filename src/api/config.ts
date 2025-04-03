const API_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

export const display_login = `${API_URL}/aol/adminLogin`

// card 
export const display_all_cards = `${API_URL}/aol/showAllCards`;
export const Experience_Center_Digitally = `${API_URL}/aol/showAllCards/Experience Center Digitally`;
export const Facilities_Services_at_Center = `${API_URL}/aol/showAllCards/Facilities & Services at Center`;
export const Stay_Updated = `${API_URL}/aol/showAllCards/Stay Updated`;
export const Experience_Peace_With_Your_Squad = `${API_URL}/aol/showAllCards/Experience Peace With Your Squad`;
export const create_card = `${API_URL}/aol/createCard`;
export const update_card = `${API_URL}/aol/updateCard`;
export const delete_card = `${API_URL}/aol/removeCard`;

// user type 
export const create_user_type = `${API_URL}/aol/addUserType`;
export const display_all_user_type = `${API_URL}/aol/userType`;
export const update_user_type = `${API_URL}/aol/updateUSerType/`;
export const delete_user_type = `${API_URL}/aol/deleteUSerType/`;

// action 
export const add_action = `${API_URL}/aol/addAction`;
export const display_all_action =`${API_URL}/aol/displayAction`;
export const update_action = `${API_URL}/aol/updateAction`;
export const delete_action = `${API_URL}/aol/deleteAction`;

// adv 
export const add_advertisement = `${API_URL}/aol/addAdv`;
export const display_all_advertisement = `${API_URL}/aol/displayAdvertisement`;

// head 
export const display_all_head = `${API_URL}/aol/displayHeading`;
export const create_heading = `${API_URL}/aol/addHeading`;
export const update_heading = `${API_URL}/aol/updateHeading/`;
export const delete_heading = `${API_URL}/aol/deleteHeading/`;

// youtube 
export const add_youtube_link = `${API_URL}/aol/addYoutubeLinks`;
export const display_mobile = `${API_URL}/aol/displayMobYoutubeLinks`;
export const display_web = `${API_URL}/aol/displayWebYoutubeLinks`;
export const update_youtube_link = `${API_URL}/aol/updateYoutubeLink/`;
export const delete_youtube_link = `${API_URL}/aol/deleteYoutubeLink/`;

// popup
export const add_PopUp = `${API_URL}/aol/addPopUp`;