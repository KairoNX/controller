import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const size = {
  width: 32,
  height: 32,
}
 
export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            fontFamily: 'system-ui',
            letterSpacing: '-0.05em',
          }}
        >
          Z
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}


