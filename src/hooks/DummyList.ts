const RestaurantList = [
  {
    id :  0,
    name : 'Kababjees',
    image : require('../assets/images/kababjees_res.jpeg'),
    rating : 3.5,
    location : 'Shaheed-e-Millat'
  },
  {
    id :  1,
    name : 'Paradise',
    image : require('../assets/images/paradise_res.webp'),
    rating : 2.5,
    location : 'Do Darya'
  },
  {
    id :  2,
    name : 'Cocochan',
    image : require('../assets/images/cocochan_res.jpeg'),
    rating : 1.5,
    location : '1A Tipu Sultan Rd, next to Xanders, Karachi Memon Co-operative Housing Society Jinnah Housing Society PECHS, Karachi, Karachi City, Sindh'
  },
  {
    id :  3,
    name : 'No Lies Fries',
    image : require('../assets/images/no_lies_fries_res.jpeg'),
    rating : 5.0,
    location : '1A Tipu Sultan Rd, next to Xanders, Karachi Memon Co-operative Housing Society Jinnah Housing Society PECHS, Karachi, Karachi City, Sindh'
  },
  {
    id :  4,
    name : 'No Lies Fries',
    image : require('../assets/images/no_lies_fries_res.jpeg'),
    rating : 5.0,
    location : '1A Tipu Sultan Rd, next to Xanders, Karachi Memon Co-operative Housing Society Jinnah Housing Society PECHS, Karachi, Karachi City, Sindh'
  },
]

const MenuParentList =
  {
    menuParent : [
      {
        id : 0,
        name : 'Burger',
        image : require('../assets/images/burger.jpeg'),
        menuSub : [
          {
            id : 0,
            image : require('../assets/images/burger_img_1.jpeg'),
            name : "Egg Burger",
            price : "Rs - 250"
          },
          {
            id : 1,
            image : require('../assets/images/burger_img_2.jpeg'),
            name : "Zinger Burger",
            price : "Rs - 80"
          },
          {
            id : 2,
            image : require('../assets/images/burger_img_3.jpeg'),
            name : "Chicken Burger",
            price : "Rs - 150"
          },
        ]
      },
      {
        id :  1,
        name : 'Pizza',
        image : require('../assets/images/pizza_img.jpg'),
        menuSub : [
          {
            id : 0,
            image : require('../assets/images/pizza_img_1.jpeg'),
            name : "Sabzi Wali roti",
            price : "Rs - 1500"
          },
          {
            id : 1,
            image : require('../assets/images/pizza_img_2.jpeg'),
            name : "Vegetable",
            price : "Rs - 1150"
          },
          {
            id : 2,
            image : require('../assets/images/pizza_img_3.jpeg'),
            name : "Crimmy Tikka",
            price : "Rs - 800"
          },
          {
            id : 3,
            image : require('../assets/images/pizza_img_4.jpeg'),
            name : "BBQ",
            price : "Rs - 50"
          },
        ]
      },
      {
        id :  2,
        name : 'Roll',
        image : require('../assets/images/rolls_img.png'),
        menuSub : [
          {
            id : 0,
            name : "Chicken Roll",
            price : "Rs - 250"
          },
          {
            id : 1,
            name : "Zinger Roll",
            price : "Rs - 150"
          },
          {
            id : 2,
            name : "BBQ Roll",
            price : "Rs - 150"
          },
        ]
      },
    ]
  }

const RecentSearch = [
  {
    id : 0,
    name : "Paradise",
    image : require('../assets/images/paradise_res.webp')
  },
  {
    id : 1,
    name : "Cocochan",
    image : require('../assets/images/cocochan_res.jpeg')
  },
  {
    id : 2,
    name : "No Lies Fries",
    image : require('../assets/images/no_lies_fries_res.jpeg')
  }
]

const CategoryList = [
  {
    id : 0,
    name : "Pizza",
    image : require('../assets/images/pizza_img.jpg')
  },
  {
    id : 1,
    name : "Roll",
    image : require('../assets/images/rolls_img.png')
  },
  {
    id : 2,
    name : "Kadhai",
    image : require('../assets/images/chicken_kadhai_img.jpeg')
  },
  {
    id : 3,
    name : "Burger",
    image : require('../assets/images/burger.jpeg')
  },
]

const ReviewList = [
  {
    id : 0,
    name : "Ermina",
    image : require('../assets/images/user_img_1.jpeg'),
    rating : "1.5",
    review : "Kolachi is one of the finest dinner restaurant in karachi. I go there so many times and especially with friends I visit them twice or thrice a month.",
  },
  {
    id : 1,
    name : "Eimaan",
    image : require('../assets/images/user_img_2.jpeg'),
    rating : "2.5",
    review : "Kolachi is one of the finest dinner restaurant in karachi. I go there so many times and especially with friends I visit them twice or thrice a month.",
  },
  {
    id : 2,
    name : "Eliza",
    image : require('../assets/images/user_img_3.jpeg'),
    rating : "3.0",
    review : "This is one of my many visits to this restaurant, which is a must whenever I visit Karachi. ",
  },
  {
    id : 3,
    name : "Eshal",
    image : require('../assets/images/user_img_4.jpeg'),
    rating : "5.0",
    review : "Food is good service was a bit average... probably because it was jam packed and they were less on staff",
  },
  {
    id : 4,
    name : "Eraj",
    image : require('../assets/images/user_img_5.jpeg'),
    rating : "4.5",
    review : "Their mutton karhai, fried Red Snapper, Chinese dishes and all items of Bar B Q are simply superb in taste.",
  }
]

const ResPostList = [
  {
    id : 0,
    name : "Kababjees",
    user_img : require('../assets/images/user_img_1.jpeg'),
    post_img : require('../assets/images/chicken_kadhai_img.jpeg'),
    description : "There are many kinds of crave worthy foods. From foods that are sweet and salty to savory, there is one crave-able item that sure gets consumers talking.",
    likes : 12,

  },
  {
    id : 1,
    name : 'Kababjees',
    user_img : require('../assets/images/user_img_2.jpeg'),
    post_img : require('../assets/images/burger_img_3.jpeg'),
    description : "There are many kinds of crave worthy foods. From foods that are sweet and salty to savory, there is one crave-able item that sure gets consumers talking.",
    likes : 122,
  },
  {
    id : 1,
    name : 'Kababjees',
    user_img : require('../assets/images/user_img_4.jpeg'),
    post_img : require('../assets/images/pizza_img_1.jpeg'),
    description : "There are many kinds of crave worthy foods. From foods that are sweet and salty to savory, there is one crave-able item that sure gets consumers talking.",
    likes : 160,
  }
]

const ChatList = [
  {
    id : 0,
    type : 'text',
    message : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    messageType : "sender"
  },
  {
    id : 1,
    type : 'text',
    message : "Salman here",
    messageType : "receiver"
  },
  {
    id : 2,
    type : 'text',
    message : "Afaq there",
    messageType : "sender"
  },
  {
    id : 3,
    type : 'text',
    message : "Afaq there",
    messageType : "receiver"
  }
]


export default {
  RestaurantList,
  MenuParentList,
  RecentSearch,
  CategoryList,
  ReviewList,
  ResPostList,
  ChatList
}
