INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2019-03-04', '2019-03-06'),
(4, 4, '2019-04-04', '2019-04-07'),
(5, 5, '2019-05-05', '2019-05-07');

INSERT INTO users (name, email, password)
VALUES ('Eva Stanley', 'sebastianguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Dominic Parks', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Sue Luna', 'jasonvincent@gmx.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Rosalie Garza', 'jacksondavid@gmx.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) 
VALUES (1,'beach front', 'beautiful white sand modern house', 'www.beautybeach-photo-thumbnail.com', 'www.beautybeach-photo-cover', 350, 2, 4, 5, 'Mexico', 'Maripose St', 'New World City', 'British Islands', '1223VS', TRUE ),
(2, 'beach back', 'nice white rock house', 'www.rockhouse-photo-thumbnail.com', 'www.rockhouse-photo-cover', 350, 2, 4, 5, 'Morocco', 'Mon St', 'Vancouver', 'Morocco Islands', '1245WZ', TRUE ),
(3, 'beach side', 'new sunny condo', 'www.condo-photo-thumbnail.com', 'www.condo-photo-cover', 350, 2, 4, 5, 'Mexico', 'Maripose St', 'Vancouver', 'British Islands', '125ML', TRUE ),
(4, 'beach side', 'new sunny condo', 'www.condo-photo-thumbnail.com', 'www.condo-photo-cover', 350, 2, 4, 5, 'Mexico', 'Maripose St', 'New World City', 'British Islands', '125ML', TRUE ),
(5, 'beach side', 'new sunny condo', 'www.condo-photo-thumbnail.com', 'www.condo-photo-cover', 350, 2, 4, 5, 'Mexico', 'Maripose St', 'New World City', 'British Islands', '125ML', TRUE );;


 INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
 VALUES (2, 5, 5, 3, 'wow wow wow'),
 (1, 2, 3, 4, 'Bla bla bla'),
 (3, 1, 4, 4, 'Yes yes yes'),
 (4, 3, 2, 4, 'cool cool cool'),
 (5, 4, 1, 4, 'nice nice nice');




