import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { RootNavigator } from '@navigation/RootNavigator';
import { AuthProvider } from '@contexts/AuthContext';
import { PreferencesProvider, usePreferences } from '@contexts/PreferencesContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native';
import { EmotionProvider } from '@utils/emotionStore';
import { requestNotificationPermission } from '@services/notifications';

function AppNavigation() {
	const { preferences } = usePreferences();
	const system = useColorScheme();
	const theme = preferences.theme === 'system' ? system : preferences.theme;
	useEffect(() => {
		requestNotificationPermission().catch(() => {});
	}, []);
	return (
		<NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
			<RootNavigator />
		</NavigationContainer>
	);
}

export default function App() {
	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<AuthProvider>
				<PreferencesProvider>
					<EmotionProvider>
						<AppNavigation />
					</EmotionProvider>
				</PreferencesProvider>
			</AuthProvider>
		</GestureHandlerRootView>
	);
}