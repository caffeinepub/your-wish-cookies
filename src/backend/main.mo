import Text "mo:core/Text";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Order "mo:core/Order";

actor {
  type Cookie = {
    id : Nat;
    name : Text;
    description : Text;
    price : Text;
    category : Text;
  };

  type Message = {
    role : Text; // "user" or "bot"
    text : Text;
    timestamp : Time.Time;
  };

  module Cookie {
    public func compareByName(cookie1 : Cookie, cookie2 : Cookie) : Order.Order {
      Text.compare(cookie1.name, cookie2.name);
    };
  };

  let cookies = Map.empty<Nat, Cookie>();
  let chatHistory = List.empty<(Time.Time, Message)>();

  // Initialize with some cookies
  func initializeCookies() {
    let initialCookies : [Cookie] = [
      {
        id = 1;
        name = "Chocolate Chip";
        description = "Classic cookie with rich chocolate chips.";
        price = "2.00";
        category = "classic";
      },
      {
        id = 2;
        name = "Oatmeal Raisin";
        description = "A delightful chewy cookie with oats and raisins.";
        price = "2.50";
        category = "classic";
      },
      {
        id = 3;
        name = "Sugar Cookie";
        description = "Soft and sweet cookie with a simple touch.";
        price = "1.80";
        category = "classic";
      },
      {
        id = 4;
        name = "Peanut Butter";
        description = "Creamy peanut butter flavor in every bite.";
        price = "2.20";
        category = "classic";
      },
      {
        id = 5;
        name = "Pumpkin Spice";
        description = "Seasonal favorite with pumpkin and spices.";
        price = "3.00";
        category = "seasonal";
      },
      {
        id = 6;
        name = "Red Velvet";
        description = "Special treat with a rich red velvet taste.";
        price = "3.50";
        category = "special";
      },
    ];

    for (cookie in initialCookies.values()) {
      cookies.add(cookie.id, cookie);
    };
  };

  // Seed cookies on first deploy
  system func preupgrade() {};
  system func postupgrade() {
    initializeCookies();
  };

  // Helper functions for chat responses
  func handleHelp() : Text {
    "Hello! I can help you with:\n- Viewing our cookie menu\n- Checking prices\n- Placing orders\n- Getting cookie descriptions\nTry typing 'menu' to see all cookies!";
  };

  func handleMenu() : Text {
    var menuText = "Our cookie selection:\n";
    let sortedCookies = cookies.toArray().map(func((_, c)) { c }).sort(Cookie.compareByName);

    for (cookie in sortedCookies.values()) {
      menuText #= "\n" # cookie.name # " - " # cookie.price # " USD (" # cookie.category # ")";
    };
    menuText;
  };

  func handleSpecificCookie(input : Text) : ?Text {
    for ((_, cookie) in cookies.entries()) {
      if (input.contains(#text(cookie.name.toLower()))) {
        return ?("Cookie: " # cookie.name # "\n" # cookie.description # "\nPrice: " # cookie.price # " USD");
      };
    };
    null;
  };

  func handleOrder() : Text {
    "To place an order, please specify the cookie name and quantity you would like. Our team will process your request!";
  };

  func handlePriceQuery() : Text {
    "All prices are listed in our menu. Most cookies range from 1.80 to 3.50 USD. Refer to the 'menu' for detailed pricing.";
  };

  // Public functions

  public query ({ caller }) func getAllCookies() : async [Cookie] {
    cookies.values().toArray().sort(Cookie.compareByName);
  };

  public query ({ caller }) func getCookieById(id : Nat) : async ?Cookie {
    cookies.get(id);
  };

  public shared ({ caller }) func sendChatMessage(message : Text) : async Text {
    let userMessage : Message = {
      role = "user";
      text = message;
      timestamp = Time.now();
    };
    chatHistory.add((userMessage.timestamp, userMessage));

    let input = message.toLower();
    var botResponse : Text = switch (input) {
      case (input) {
        if (input.contains(#text("help"))) { return handleHelp() };
        if (input.contains(#text("menu"))) { return handleMenu() };
        if (input.contains(#text("order"))) { return handleOrder() };
        if (input.contains(#text("price"))) { return handlePriceQuery() };
        switch (handleSpecificCookie(input)) {
          case (?response) { return response };
          case (null) { "I'm sorry, I didn't understand that. Type 'help' for assistance." };
        };
      };
    };

    let botMessage : Message = {
      role = "bot";
      text = botResponse;
      timestamp = Time.now();
    };
    chatHistory.add((botMessage.timestamp, botMessage));

    botResponse;
  };

  public query ({ caller }) func getChatHistory() : async [Message] {
    chatHistory.toArray().map(func((_, message)) { message });
  };
};

