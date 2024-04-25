"use client";

import PropTypes from "prop-types";

// i18n
import "@/app/(RSAdmin)/admin/locales/i18n";

// scroll bar
import "simplebar-react/dist/simplebar.min.css";

// lightbox
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// map
import "mapbox-gl/dist/mapbox-gl.css";

// editor
// import 'react-quill/dist/quill.snow.css';

// slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// lazy image
import "react-lazy-load-image-component/src/effects/blur.css";

// ----------------------------------------------------------------------

// locales
import { LocalizationProvider } from "@/app/(RSAdmin)/admin/locales";
// theme
import ThemeProvider from "@/app/(RSAdmin)/admin/theme";
// import { ThemeProvider } from "@/app/(RSAdmin)/admin/providers/theme-provider";
import { primaryFont } from "@/app/(RSAdmin)/admin/theme/typography";
// components
import ProgressBar from "@/app/(RSAdmin)/admin/common/progress-bar";
import MotionLazy from "@/app/(RSAdmin)/admin/common/animate/motion-lazy";
import SnackbarProvider from "@/app/(RSAdmin)/admin/common/snackbar/snackbar-provider";
import {
  SettingsProvider,
  SettingsDrawer,
} from "@/app/(RSAdmin)/admin/common/settings";
// auth
import {
  AuthProvider,
  AuthConsumer,
} from "@/app/(RSAdmin)/admin/auth/context/jwt";
// import { AuthProvider, AuthConsumer } from '@/app/(RSAdmin)/admin/auth/context/auth0';
// import { AuthProvider, AuthConsumer } from '@/app/(RSAdmin)/admin/auth/context/amplify';
// import { AuthProvider, AuthConsumer } from '@/app/(RSAdmin)/admin/auth/context/firebase';

import { ToastProvider } from "@/app/(RSAdmin)/admin/providers/toast-provider";
// ----------------------------------------------------------------------
import { AuthProvider as WebAuthProvider } from "./(RSWeb)/context/auth";
import { SessionProvider } from "next-auth/react";
import { SocketProvider } from "./(RSWeb)/context/sockets/socket-provider";
// import { SocketProvider } from "./(RSWeb)/context/sockets/socket-provider";

export default function RootLayout({ children, session }) {
  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        <LocalizationProvider>
          <SettingsProvider
            defaultSettings={{
              themeMode: "light", // 'light' | 'dark'
              themeDirection: "ltr", //  'rtl' | 'ltr'
              themeContrast: "default", // 'default' | 'bold'
              themeLayout: "vertical", // 'vertical' | 'horizontal' | 'mini'
              themeColorPresets: "blue", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
              themeStretch: false,
            }}
          >
            <ThemeProvider>
              {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
              <MotionLazy>
                <SnackbarProvider>
                  <SettingsDrawer />
                  <ProgressBar />
                  <SessionProvider session={session}>
                    <SocketProvider>
                      <WebAuthProvider>
                        <AuthProvider>
                          <ToastProvider />
                          {children}
                        </AuthProvider>
                      </WebAuthProvider>
                    </SocketProvider>
                  </SessionProvider>
                </SnackbarProvider>
              </MotionLazy>
              {/* </ThemeProvider> */}
            </ThemeProvider>
          </SettingsProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};
