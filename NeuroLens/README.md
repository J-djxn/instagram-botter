# NeuroLens

Cross-platform React Native app with Supabase auth, emotion/gesture detection scaffold, AI writing assistant using Hugging Face, Tailwind styling, and Firebase notifications.

## Setup

1. Install dependencies:

```bash
yarn
```

2. Configure Supabase:
- Edit `src/services/supabaseClient.ts` or `src/services/supabaseClient.js` with your Supabase URL and anon key.
- Create a table `users (id uuid primary key, email text, preferences jsonb, theme text)` with RLS enabled and policies for the authenticated user on their own row.

3. Firebase Notifications:
- Add Firebase config for Android and iOS. Install Google Services and set up `@react-native-firebase/messaging` per docs.

4. Camera + Detection:
- The Camera screen uses `react-native-vision-camera`. Integrate a frame processor for MediaPipe or use `vision-camera-face-detector` to implement blink and gaze detection. The current implementation has a simulate button.

5. Hugging Face:
- Enter your Hugging Face API key in the Writing Assistant screen to receive suggestions from `mistralai/Mistral-7B-Instruct-v0.2`.

6. Start app:

```bash
yarn start
```

Open Android emulator or iOS simulator:

```bash
yarn android
# or
yarn ios
```

## Structure
- `src/screens`: Auth, Dashboard, Camera, WritingAssistant, Profile
- `src/contexts`: Auth and Preferences contexts
- `src/services`: Supabase client, Hugging Face API helper, Notifications
- `src/navigation`: RootNavigator with stack+tabs
- `src/utils/emotionStore`: Global emotion/gesture state

## Notes
- Tailwind (NativeWind) styling can be added by using className props if desired. Current sample uses inline styles for simplicity but structure supports Tailwind.
- Ensure permissions for camera, microphone, and notifications are configured in native projects.