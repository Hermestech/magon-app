import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ConfigProvider } from 'antd'
import esES from 'antd/lib/locale/es_ES'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider locale={esES}>
      <Component {...pageProps} />
    </ConfigProvider>
  )
}
