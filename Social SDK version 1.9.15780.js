#define DISCORDPP_IMPLEMENTATION
#include "discordpp.h"
#include <atomic>
#include <csignal>
#include <functional>
#include <iostream>
#include <string>
#include <thread>

// Replace with your Discord Application ID
const uint64_t APPLICATION_ID = 1234;

// Create a flag to stop the application
std::atomic<bool> running = true;

// Signal handler to stop the application
void signalHandler(int signum) { running.store(false); }

int main() {
  std::signal(SIGINT, signalHandler);
  std::cout << "🚀 Initializing Discord SDK...\n";

  // Create our Discord Client
  auto client = std::make_shared<discordpp::Client>();

  // Set up logging callback
  client->AddLogCallback(
      [](auto message, auto severity) {
        std::cout << "[" << EnumToString(severity) << "] " << message
                  << std::endl;
      },
      discordpp::LoggingSeverity::Info);

  client->RegisterLaunchCommand(APPLICATION_ID, "/usr/bin/gnome-text-editor");

  // Set up status callback to monitor client connection
  client->SetStatusChangedCallback([client](discordpp::Client::Status status,
                                            discordpp::Client::Error error,
                                            int32_t errorDetail) {
    std::cout << "🔄 Status changed: "
              << discordpp::Client::StatusToString(status) << std::endl;

    if (status == discordpp::Client::Status::Ready) {
      std::cout << "✅ Client is ready! You can now call SDK functions.\n";

      // Access initial relationships data
      std::cout << "👥 Friends Count: " << client->GetRelationships().size()
                << std::endl;

      // Create discordpp::Activity - This Rich Presence Activity is your invite configuration
      discordpp::Activity activity;
      activity.SetType(discordpp::ActivityTypes::Playing);

      // Set the game state and details
      activity.SetState("In Competitive Match");
      activity.SetDetails("Valhalla");

      // Set the party information
      discordpp::ActivityParty party;
      party.SetId("party1234");
      party.SetCurrentSize(1);          // current party size
      party.SetMaxSize(5);              // max party size
      // Set the party information in the Activity, to inform the invite about the party size and how many players can join
      activity.SetParty(party);

      // Create ActivitySecrets
      discordpp::ActivitySecrets secrets;
      secrets.SetJoin("joinsecret1234");    // Rich Presence secret will be in the invite payload
      activity.SetSecrets(secrets);

      // Set supported platforms that can join the game
      // See discordpp::ActivityGamePlatforms for available platforms
      activity.SetSupportedPlatforms(discordpp::ActivityGamePlatforms::Desktop);

      // Update Rich Presence presence
      client->UpdateRichPresence(activity, [](discordpp::ClientResult result) {
          if(result.Successful()) {
              std::cout << "🎮 Rich Presence updated successfully!\n";
              // ✅ Rich Presence updated = Game invites now available!
          } else {
              std::cerr << "❌ Rich Presence update failed";
              // ❌ No Rich Presence = No invites possible
          }
      });

    } else if (error != discordpp::Client::Error::None) {
      std::cerr << "❌ Connection Error: "
                << discordpp::Client::ErrorToString(error)
                << " - Details: " << errorDetail << std::endl;
    }
  });

  // Generate OAuth2 code verifier for authentication
  auto codeVerifier = client->CreateAuthorizationCodeVerifier();

  // Set up authentication arguments
  discordpp::AuthorizationArgs args{};
  args.SetClientId(APPLICATION_ID);
  args.SetScopes(discordpp::Client::GetDefaultPresenceScopes());
  args.SetCodeChallenge(codeVerifier.Challenge());

  // Begin authentication process
  client->Authorize(args, [client, codeVerifier](auto result, auto code,
                                                 auto redirectUri) {
    if (!result.Successful()) {
      std::cerr << "❌ Authentication Error: " << result.Error() << std::endl;
      return;
    } else {
      std::cout << "✅ Authorization successful! Getting access token...\n";

      // Exchange auth code for access token
      client->GetToken(
          APPLICATION_ID, code, codeVerifier.Verifier(), redirectUri,
          [client](discordpp::ClientResult result, std::string accessToken,
                   std::string refreshToken,
                   discordpp::AuthorizationTokenType tokenType,
                   int32_t expiresIn, std::string scope) {
            std::cout
                << "🔓 Access token received! Establishing connection...\n";
            // Next Step: Update the token and connect
            client->UpdateToken(
                discordpp::AuthorizationTokenType::Bearer, accessToken,
                [client](discordpp::ClientResult result) {
                  if (result.Successful()) {
                    std::cout << "🔑 Token updated, connecting to Discord...\n";
                    client->Connect();
                  }
                });
          });
    }
  });

  // Keep application running to allow SDK to receive events and callbacks
  while (running) {
    discordpp::RunCallbacks();
    std::this_thread::sleep_for(std::chrono::milliseconds(10));
  }

  return 0;
}
