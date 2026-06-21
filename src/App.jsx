import React, { useEffect, useRef, useState } from 'react'
import {
  AlertCircle,
  AppWindow,
  ArrowRight,
  Bed,
  Building2,
  Car,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Grid2x2,
  Home,
  Info,
  Instagram,
  Layers,
  Loader,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  Plus,
  Sofa,
  Square,
  X,
 Mail
} from 'lucide-react'
import { Analytics } from '@vercel/analytics/react'

const initialForm = {
  name: '',
  phone: '',
  service: 'Office cleaning',
  date: '',
  time: '',
  address: '',
}

const mediaImages = Array.from({ length: 21 }, (_, i) => `/media/job-${String(i + 1).padStart(2, '0')}.jpg`)
const mediaPanelClass = 'relative w-full h-[calc((100svh-5.5rem-0.5rem)/2)] md:h-[683px] md:w-[668px] md:max-w-full md:mt-10 lg:mt-14 md:justify-self-end overflow-hidden bg-gray-100 scroll-mt-[5.5rem]'
const aboutMediaPanelClass = 'reveal active relative w-full h-[360px] md:h-[506px] md:w-[668px] md:max-w-full md:mt-0 md:justify-self-end overflow-hidden bg-gray-100'
const showcaseMedia = [
  ...Array.from({ length: 16 }, (_, i) => ({
    type: 'image',
    src: `/showcase/showcase-${String(i + 1).padStart(2, '0')}.jpeg`,
  })),
  ...Array.from({ length: 6 }, (_, i) => ({
    type: 'video',
    src: `/showcase/showcase-video-${String(i + 1).padStart(2, '0')}.mp4`,
  })),
]
const taglineText = 'We clean, You relax.'

const services = [
  {
    title: 'Office Cleaning',
    description: 'Comprehensive commercial cleaning. We ensure your workspace reflects the professionalism of your business.',
    icon: Building2,
    wide: true,
  },
  { title: 'Beds & Mattresses', description: 'Deep extraction to eliminate allergens.', icon: Bed },
  { title: 'Carpets', description: 'Industrial-grade stain and dirt removal.', icon: Layers },
  { title: 'Rugs', description: 'Delicate wash and restore for fine fibers.', icon: Square },
  { title: 'Tiles & Grout', description: 'High-pressure scrub and polish.', icon: Grid2x2 },
  { title: 'Dining Chairs', description: 'Upholstery deep clean and fabric refresh.', icon: Sofa },
  { title: 'Car Interior', description: 'Complete mobile auto valeting.', icon: Car },
  {
    title: 'Window Cleaning',
    description: 'Streak-free interior and exterior glass cleaning for optimal clarity.',
    icon: AppWindow,
    wide: true,
  },
]

const pricingCards = [
  {
    title: 'Carpet Solutions',
    service: 'Carpets',
    icon: Layers,
    imageIcon: '/icons/carpet-cleaning.png',
    lines: [
      ['160cm x 230cm', 'R350'],
      ['200cm x 290cm', 'R400'],
      ['250cm x 350cm', 'R500'],
      ['300cm x 400cm', 'R600'],
    ],
  },
  {
    title: 'Upholstery',
    service: 'Dining chairs',
    icon: Sofa,
    imageIcon: '/icons/chair-cleaning.png',
    lines: [
      ['1 Seater Couch', 'R300'],
      ['2 Seater Couch', 'R400'],
      ['3 Seater Couch', 'R500'],
      ['4 Seater Couch', 'R600'],
      ['Single/3Q Mattress', 'R400'],
      ['King/Queen Mattress', 'R550'],
    ],
  },
  {
    title: 'Full Home Clean',
    service: 'Other / Multiple Services',
    icon: Home,
    imageIcon: '/icons/home-cleaning.png',
    lines: [
      ['1 Bedroom House', 'R1500'],
      ['2 Bedrooms House', 'R2000'],
      ['3 Bedrooms House', 'R2500'],
      ['4 Bedrooms House', 'R3500'],
    ],
  },
  {
    title: 'Cars Deep Cleaning',
    service: 'Car interior',
    icon: Car,
    imageIcon: '/icons/car-cleaning.png',
    lines: [
      ['Hatchback', 'R500'],
      ['Sedan', 'R600'],
      ['SUV', 'R700'],
      ['Bakkie (Pickup)', 'R800'],
    ],
  },
  {
    title: 'Window Cleaning',
    service: 'Windows',
    icon: AppWindow,
    imageIcon: '/icons/windows-cleaning.png',
    lines: [
      ['Standard (up to 5)', 'R450'],
      ['Large (up to 10)', 'R750'],
      ['Complete House (up to 20)', 'R950'],
    ],
  },
]

const pricingIconSkins = [
  'bg-[radial-gradient(circle_at_28%_22%,#dcfce7,#22c55e_58%,#14532d)] shadow-[0_14px_28px_-12px_rgba(34,197,94,0.8)]',
  'bg-[radial-gradient(circle_at_28%_22%,#e0f2fe,#38bdf8_58%,#075985)] shadow-[0_14px_28px_-12px_rgba(14,165,233,0.75)]',
  'bg-[radial-gradient(circle_at_28%_22%,#fef3c7,#f59e0b_58%,#92400e)] shadow-[0_14px_28px_-12px_rgba(245,158,11,0.75)]',
  'bg-[radial-gradient(circle_at_28%_22%,#fee2e2,#ef4444_58%,#991b1b)] shadow-[0_14px_28px_-12px_rgba(239,68,68,0.75)]',
  'bg-[radial-gradient(circle_at_28%_22%,#ede9fe,#8b5cf6_58%,#4c1d95)] shadow-[0_14px_28px_-12px_rgba(139,92,246,0.75)]',
]

const servicePills = [
  { label: 'Office cleaning', short: 'Office', icon: Building2 },
  { label: 'Beds & mattresses', short: 'Mattress', icon: Bed },
  { label: 'Carpets', short: 'Carpets', icon: Layers },
  { label: 'Dining chairs', short: 'Upholstery', icon: Sofa },
  { label: 'Windows', short: 'Windows', icon: AppWindow },
  { label: 'Car interior', short: 'Auto', icon: Car },
  { label: 'Other / Multiple Services', short: 'Custom', icon: Plus },
]

const clientLogos = [
  { name: 'Bed World Factory', initials: 'bw', logo: 'https://www.google.com/s2/favicons?domain=bedworld.co.za&sz=128', className: 'bg-[#b00012] text-white' },
  { name: 'Christ Embassy', initials: 'CE', logo: 'https://www.google.com/s2/favicons?domain=christembassy.org&sz=128' },
  { name: 'Hatfield Toyota', initials: 'HT', logo: 'https://www.google.com/s2/favicons?domain=toyota.co.za&sz=128' },
]

const timeSlots = ['Morning (08:00 - 11:00)', 'Midday (11:00 - 14:00)', 'Afternoon (14:00 - 17:00)']
const defaultMapSrc = 'https://maps.google.com/maps?q=1618%20Jasmyn%20St,%20Silverton,%20Pretoria&t=&z=12&ie=UTF8&iwloc=&output=embed'

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [formData, setFormData] = useState(initialForm)
  const [findMeState, setFindMeState] = useState('idle')
  const [successDetails, setSuccessDetails] = useState(null)
  const [submitState, setSubmitState] = useState('idle')
  const [activeMediaIndex, setActiveMediaIndex] = useState(0)
  const [activeShowcaseIndex, setActiveShowcaseIndex] = useState(0)
  const [isMediaOpen, setIsMediaOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [popiaAccepted, setPopiaAccepted] = useState(false)
  const [popiaReady, setPopiaReady] = useState(false)
  const [mapSrc, setMapSrc] = useState(defaultMapSrc)
  const hideSuccessTimer = useRef(null)
  const touchStartX = useRef(null)
  const touchCurrentX = useRef(null)

  useEffect(() => {
    setPopiaAccepted(localStorage.getItem('execpro-popia-consent-v2') === 'accepted')
    setPopiaReady(true)
  }, [])

  const acceptPopiaNotice = () => {
    localStorage.setItem('execpro-popia-consent-v2', 'accepted')
    setPopiaAccepted(true)
  }

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal')
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    )

    revealElements.forEach((el) => revealObserver.observe(el))

    return () => {
      revealObserver.disconnect()
      if (hideSuccessTimer.current) clearTimeout(hideSuccessTimer.current)
    }
  }, [])

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = previousScrollRestoration
      }
    }
  }, [])

  useEffect(() => {
    if (!isMediaOpen) {
      document.body.style.overflow = ''
      return undefined
    }

    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsMediaOpen(false)
      if (event.key === 'ArrowRight') setActiveMediaIndex((prev) => (prev + 1) % mediaImages.length)
      if (event.key === 'ArrowLeft') setActiveMediaIndex((prev) => (prev - 1 + mediaImages.length) % mediaImages.length)
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isMediaOpen])

  useEffect(() => {
    if (isMediaOpen) return undefined

    const intervalId = window.setInterval(() => {
      setActiveMediaIndex((prev) => (prev + 1) % mediaImages.length)
    }, 2800)

    return () => window.clearInterval(intervalId)
  }, [isMediaOpen])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveShowcaseIndex((prev) => (prev + 1) % showcaseMedia.length)
    }, 2800)

    return () => window.clearInterval(intervalId)
  }, [])

  const scrollTo = (selector) => {
    if (selector === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
  }

  const onAnchorClick = (selector) => (event) => {
    event.preventDefault()
    setMobileOpen(false)
    scrollTo(selector)
  }

  const handleInput = (event) => {
    const { id, value } = event.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const selectService = (service) => setFormData((prev) => ({ ...prev, service }))

  const addToBooking = (service) => (event) => {
    event.preventDefault()
    selectService(service)
    scrollTo('#contact')
  }

  const goToPrevMedia = () => setActiveMediaIndex((prev) => (prev - 1 + mediaImages.length) % mediaImages.length)
  const goToNextMedia = () => setActiveMediaIndex((prev) => (prev + 1) % mediaImages.length)

  const handleMediaTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
    touchCurrentX.current = touchStartX.current
  }

  const handleMediaTouchMove = (event) => {
    touchCurrentX.current = event.touches[0]?.clientX ?? touchCurrentX.current
  }

  const handleMediaTouchEnd = () => {
    if (touchStartX.current === null || touchCurrentX.current === null) {
      touchStartX.current = null
      touchCurrentX.current = null
      return
    }

    const deltaX = touchStartX.current - touchCurrentX.current
    if (Math.abs(deltaX) >= 50) {
      if (deltaX > 0) goToNextMedia()
      else goToPrevMedia()
    }

    touchStartX.current = null
    touchCurrentX.current = null
  }

  const resetMapState = () => {
    setFindMeState('idle')
    setMapSrc(defaultMapSrc)
  }

  const handleFindMe = () => {
    if (!navigator.geolocation) {
      setFindMeState('unsupported')
      return
    }

    setFindMeState('loading')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        setMapSrc(`https://maps.google.com/maps?q=${lat},${lng}&t=&z=16&ie=UTF8&iwloc=&output=embed`)
        setFormData((prev) => ({
          ...prev,
          address: `Captured Coordinates: ${lat.toFixed(5)}, ${lng.toFixed(5)}`,
        }))
        setFindMeState('success')
      },
      () => setFindMeState('error'),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitState('loading')

    const payload = new FormData()
    payload.append('name', formData.name)
    payload.append('phone', formData.phone)
    payload.append('service', formData.service)
    payload.append('date', formData.date)
    payload.append('time', formData.time)
    payload.append('address', formData.address)
    payload.append('_subject', `New Executive Pro Cleaner booking: ${formData.service}`)
    payload.append('_template', 'table')
    payload.append('_captcha', 'false')
    payload.append('_honey', '')

    try {
      const response = await fetch('https://formsubmit.co/ajax/mokopekagi@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload,
      })
      const result = await response.json()

      if (!response.ok || result.success === 'false') {
        throw new Error(result.message || 'Unable to send booking request.')
      }

      setSuccessDetails({ ...formData })
      setSubmitState('success')
      setFormData(initialForm)
      resetMapState()

      if (hideSuccessTimer.current) clearTimeout(hideSuccessTimer.current)
      hideSuccessTimer.current = setTimeout(() => {
        setSuccessDetails(null)
        setSubmitState('idle')
      }, 10000)
    } catch (error) {
      console.error('Booking email failed:', error)
      setSubmitState('error')
      window.alert('Booking email could not be sent. Please try again.')
      setTimeout(() => setSubmitState('idle'), 1500)
    }
  }

  const locationButtonContent = {
    idle: <><Navigation className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" /><span>Auto-Locate</span></>,
    loading: <><Loader className="w-3.5 h-3.5 animate-spin" /><span>Locating...</span></>,
    success: <><Check className="w-3.5 h-3.5" /><span>Location Set</span></>,
    error: <><AlertCircle className="w-3.5 h-3.5 text-red-500" /><span>Location Failed</span></>,
    unsupported: <span>Not Supported</span>,
  }

  return (
    <div className="font-sans text-brand-black bg-white antialiased flex flex-col min-h-screen relative">
      <div className="fixed inset-0 bg-dots z-[-1] pointer-events-none opacity-60" />

      <nav className="fixed w-full z-50 transition-all duration-300 bg-white border-b border-gray-100">
        <div className="w-full px-4 sm:px-8 lg:px-14">
          <div className="flex justify-between items-center py-4 min-h-[4.5rem]">
            <a href="#" className="flex items-center gap-3 shrink-0 group smooth-hover hover:opacity-80 md:ml-8 lg:ml-24 xl:ml-[14vw]" onClick={onAnchorClick('#')}>
              <div className="relative w-14 h-14 sm:w-14 sm:h-14">
                <img src="/exec_logo.png" alt="Executive Pro Cleaner logo" className="w-full h-full object-contain" width="56" height="56" loading="eager" fetchPriority="high" decoding="sync" />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="font-heading font-black text-xl md:text-2xl leading-none tracking-tighter text-brand-black uppercase">Executive</h1>
                <h2 className="font-heading font-bold text-xs md:text-xs leading-none tracking-widest text-brand-green uppercase mt-0.5">Pro Cleaner</h2>
              </div>
            </a>

            <div className="hidden md:flex flex-1 max-w-[760px] items-center justify-center gap-12 lg:gap-16 xl:gap-20 ml-auto mr-8">
              <a href="#about" className="rounded-ui-font font-bold text-lg tracking-wide text-brand-black hover:text-brand-green transition-colors uppercase" onClick={onAnchorClick('#about')}>About</a>
              <a href="#pricing" className="rounded-ui-font font-bold text-lg tracking-wide text-brand-black hover:text-brand-green transition-colors uppercase" onClick={onAnchorClick('#pricing')}>Services</a>
              <a href="#contact" className="rounded-ui-font w-44 min-h-[60px] bg-brand-black text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-brand-green transition-all duration-300 hover:-translate-y-0.5 text-center flex items-center justify-center group" onClick={onAnchorClick('#contact')}>Book Now</a>
            </div>

            <div className="md:hidden flex items-center">
              <button className="text-brand-black hover:text-brand-green focus:outline-none p-2" onClick={() => setMobileOpen(true)} aria-label="Open navigation menu">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <button type="button" aria-label="Close navigation menu" className="absolute inset-0 bg-brand-black/40" onClick={() => setMobileOpen(false)} />
          <aside className={`absolute right-0 top-0 flex h-dvh w-1/2 flex-col bg-white shadow-2xl transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="relative flex items-center justify-center px-6 py-5">
              <img src="/exec_logo.png" alt="Executive Pro Cleaner logo" className="h-14 w-14 object-contain" width="56" height="56" loading="lazy" decoding="async" />
              <button type="button" className="absolute right-6 flex h-10 w-10 items-center justify-center rounded-full text-brand-black hover:bg-gray-50 hover:text-brand-green transition-colors" onClick={() => setMobileOpen(false)} aria-label="Close navigation menu">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-ui-font flex flex-1 flex-col px-6 py-8">
              <div className="space-y-1">
                <a href="#about" className="block py-5 text-xl font-bold normal-case tracking-normal text-brand-black hover:text-brand-green transition-colors" onClick={onAnchorClick('#about')}>About</a>
                <a href="#gallery" className="block py-5 text-xl font-bold normal-case tracking-normal text-brand-black hover:text-brand-green transition-colors" onClick={onAnchorClick('#gallery')}>Gallery</a>
                <a href="#pricing" className="block py-5 text-xl font-bold normal-case tracking-normal text-brand-black hover:text-brand-green transition-colors" onClick={onAnchorClick('#pricing')}>Services</a>
              </div>
              <a href="#contact" className="mt-auto inline-flex min-h-[58px] items-center justify-center rounded-xl bg-brand-black px-6 py-4 text-lg font-bold tracking-normal text-white transition-colors hover:bg-brand-green" onClick={onAnchorClick('#contact')}>Book Now</a>
            </div>
          </aside>
        </div>
      </nav>

      <main className="flex-grow pt-[5.5rem]">
        <section className="relative overflow-hidden">
          <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 grid md:grid-cols-[52%_48%] gap-8 lg:gap-14 min-h-[calc(100vh-5.5rem)] reveal active">
            <div className="flex justify-center md:justify-start pt-16 md:pt-10 lg:pt-14 pb-10 lg:pb-16">
              <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-3xl">
                <h1 className="font-heading font-black text-6xl sm:text-7xl lg:text-8xl tracking-tighter text-brand-black uppercase leading-[0.95] mb-5">
                  Executive <br /> Cleaning for <br /> <span className="text-brand-green">Modern Spaces.</span>
                </h1>
                <p id="gloom-text" className="marker-font text-3xl md:text-4xl text-gray-400 mb-6 -rotate-2 transform gloom-parent">
                  {taglineText.split('').map((char, index) => (
                    <span key={`${char}-${index}`} className="gloom-char" style={{ animationDelay: `${1.5 + index * 0.08}s` }}>
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </p>
                <p className="rounded-ui-font text-brand-black text-lg md:text-xl mb-8 max-w-2xl leading-relaxed font-medium">
                  Professional, ultra-reliable cleaning solutions tailored for residential and corporate environments in Pretoria.
                </p>

                <div className="rounded-ui-font flex flex-col sm:flex-row justify-center gap-4 w-full mb-4">
                  <a href="#contact" className="w-full sm:w-44 min-h-[60px] bg-brand-black text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-brand-green transition-all duration-300 hover:-translate-y-0.5 text-center flex items-center justify-center group" onClick={onAnchorClick('#contact')}>Book Now</a>
                  <a href="#pricing" className="w-full sm:w-44 min-h-[60px] bg-white text-brand-black border-2 border-gray-200 px-8 py-3.5 rounded-xl font-bold text-lg hover:border-brand-black transition-all duration-300 text-center flex items-center justify-center" onClick={onAnchorClick('#pricing')}>View Pricing</a>
                </div>

                <button type="button" className="rounded-ui-font text-brand-green font-bold text-sm uppercase tracking-widest inline-flex items-center gap-2 hover:text-brand-black transition-colors" onClick={() => setIsMediaOpen(true)}>
                  View Our Work <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div id="gallery" className={mediaPanelClass}>
              <img
                src={mediaImages[activeMediaIndex % 2 === 0 ? activeMediaIndex : (activeMediaIndex - 1 + mediaImages.length) % mediaImages.length]}
                alt="Executive Pro Cleaner portfolio"
                className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${activeMediaIndex % 2 === 0 ? 'opacity-100' : 'opacity-0'}`}
                loading="eager"
                decoding="async"
              />
              <img
                src={mediaImages[activeMediaIndex % 2 === 1 ? activeMediaIndex : (activeMediaIndex - 1 + mediaImages.length) % mediaImages.length]}
                alt="Executive Pro Cleaner portfolio"
                className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${activeMediaIndex % 2 === 1 ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute left-4 bottom-4 z-10 rounded-full bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-widest text-brand-black shadow-sm md:hidden">
                Residential Work
              </div>
              </div>
              <div className="relative -mt-6 w-full h-[calc((100svh-5.5rem-0.5rem)/2)] overflow-hidden bg-gray-100 md:hidden">
                {showcaseMedia.map((item, index) => (
                  item.type === 'video' ? (
                    <video
                      key={`mobile-gallery-${item.src}`}
                      src={item.src}
                      className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${index === activeShowcaseIndex ? 'opacity-100' : 'opacity-0'}`}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <img
                      key={`mobile-gallery-${item.src}`}
                      src={item.src}
                      alt={`Executive Pro Cleaner showcase ${index + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${index === activeShowcaseIndex ? 'opacity-100' : 'opacity-0'}`}
                      loading="lazy"
                      decoding="async"
                    />
                  )
                ))}
                <div className="absolute left-4 bottom-4 z-10 rounded-full bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-widest text-brand-black shadow-sm">
                  Commercial Work
                </div>
              </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-[5.5rem] md:min-h-[calc(100vh-5.5rem)] flex items-start pt-8 pb-8 md:pt-28 md:pb-16 lg:pt-32 lg:pb-24 relative z-10 bg-gray-50 border-t border-gray-100">
          <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
            <div className="grid md:grid-cols-[52%_48%] gap-5 md:gap-8 lg:gap-14 items-start">
              <div className="reveal active">
                <p className="rounded-ui-font text-brand-green font-black text-xs md:text-sm uppercase tracking-[0.28em] mb-3 md:mb-4">About</p>
                <h2 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl text-brand-black tracking-tighter uppercase leading-[0.95]">
                  Company <span className="text-brand-green">Overview</span>
                </h2>
                <p className="rounded-ui-font text-brand-black text-base md:text-2xl leading-relaxed mt-5 md:mt-8 font-semibold max-w-4xl">
                  Established in 2023 and founded by Kagiso Mokope Ngwepe in Pretoria, Executive Pro Cleaner delivers reliable residential and commercial cleaning at highly competitive prices. We utilize professional-grade equipment and eco-aware products to ensure a pristine, safe environment. We are proud to have provided our services to notable clients and projects, including Bed World Factory, Christ Embassy, and Hatfield Toyota.
                </p>
                <div className="rounded-ui-font mt-5 md:mt-7 flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
                  <div className="flex -space-x-3">
                    {clientLogos.map((client) => (
                      <div key={client.name} className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-50 shadow-sm flex items-center justify-center overflow-hidden ring-1 ring-gray-200 ${client.className ?? 'bg-white text-brand-black'}`} title={client.name}>
                        <span className="absolute inset-0 flex items-center justify-center font-black text-sm">{client.initials}</span>
                        <img src={client.logo} alt={`${client.name} logo`} className="relative z-10 w-6 h-6 object-contain" loading="lazy" decoding="async" />
                      </div>
                    ))}
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-green border-2 border-gray-50 shadow-sm flex items-center justify-center text-white font-black text-sm ring-1 ring-brand-green/20">
                      +
                    </div>
                  </div>
                  <div>
                    <p className="text-brand-black font-black text-sm uppercase tracking-widest">Trusted by local teams</p>
                    <p className="text-gray-600 font-semibold text-sm">Bed World Factory, Christ Embassy, Hatfield Toyota and more.</p>
                  </div>
                </div>
              </div>

              <div className={aboutMediaPanelClass}>
                {showcaseMedia.map((item, index) => (
                  item.type === 'video' ? (
                    <video
                      key={item.src}
                      src={item.src}
                      className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${index === activeShowcaseIndex ? 'opacity-100' : 'opacity-0'}`}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <img
                      key={item.src}
                      src={item.src}
                      alt={`Executive Pro Cleaner showcase ${index + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${index === activeShowcaseIndex ? 'opacity-100' : 'opacity-0'}`}
                      loading="lazy"
                      decoding="async"
                    />
                  )
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-[6rem] pt-20 pb-12 lg:pt-24 lg:pb-16 relative z-10 bg-white border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {pricingCards.map((card, index) => {
                const Icon = card.icon
                return (
                  <div key={card.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-6 reveal active smooth-hover hover:shadow-soft group flex flex-col" style={{ transitionDelay: `${index * 50}ms` }}>
                    <div className="flex items-center gap-4 mb-5 border-b border-gray-100 pb-4">
                      {card.imageIcon ? (
                        <img src={card.imageIcon} alt="" className="w-16 h-16 shrink-0 object-contain transition-transform duration-300 group-hover:-translate-y-1" loading="lazy" decoding="async" />
                      ) : (
                        <div className={`relative w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-white overflow-hidden ring-1 ring-white/70 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-2deg] ${pricingIconSkins[index % pricingIconSkins.length]}`}>
                          <div className="absolute inset-x-2 top-1 h-5 rounded-full bg-white/35 blur-[2px]" />
                          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_-10px_18px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.55)]" />
                          <Icon className="relative z-10 w-7 h-7 drop-shadow-[0_3px_5px_rgba(0,0,0,0.3)]" strokeWidth={2.4} />
                        </div>
                      )}
                      <h3 className="font-heading font-bold text-base uppercase text-brand-black">{card.title}</h3>
                    </div>
                    <ul className="space-y-2.5 mb-5 flex-grow">
                      {card.lines.map(([label, price]) => (
                        <li key={`${card.title}-${label}`} className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 font-medium">{label}</span>
                          <span className="text-brand-black font-bold">{price}</span>
                        </li>
                      ))}
                    </ul>
                    <a href="#contact" className="block w-full text-center py-2.5 rounded-lg text-white font-bold text-xs uppercase tracking-wider border bg-brand-black border-brand-black hover:bg-brand-green hover:border-brand-green transition-all duration-300 hover:-translate-y-0.5" onClick={addToBooking(card.service)}>Add to Booking</a>
                  </div>
                )
              })}

              <div className="bg-brand-green rounded-2xl shadow-sm border border-brand-darkGreen p-5 lg:p-6 reveal active smooth-hover hover:shadow-soft group flex flex-col justify-center items-center text-center" style={{ transitionDelay: '250ms' }}>
                <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-brand-green bg-[radial-gradient(circle_at_28%_22%,#ffffff,#dcfce7_58%,#86efac)] shadow-[0_16px_30px_-12px_rgba(0,0,0,0.45)] overflow-hidden mb-4 transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="absolute inset-x-2 top-1 h-6 rounded-full bg-white/70 blur-[2px]" />
                  <div className="absolute inset-0 rounded-2xl shadow-[inset_0_-10px_18px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.8)]" />
                  <Info className="relative z-10 w-8 h-8 drop-shadow-[0_3px_5px_rgba(0,0,0,0.2)]" />
                </div>
                <h3 className="font-heading font-bold text-base uppercase text-white mb-2">Custom Quote?</h3>
                <p className="text-brand-light font-medium text-xs mb-5">Need office cleaning or a custom combination? Contact us for a tailored quote.</p>
                <a href="#contact" className="block w-full text-center py-2.5 rounded-lg bg-white text-brand-green font-bold text-xs uppercase tracking-wider hover:bg-brand-light transition-all duration-300" onClick={onAnchorClick('#contact')}>Contact Us</a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="rounded-ui-font scroll-mt-[5.5rem] flex items-start py-4 md:py-8 lg:py-10 bg-gray-50 relative">
          <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 reveal active">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-x-3 gap-y-3.5 md:gap-x-8 md:gap-y-5">
                <div>
                  <label htmlFor="name" className="font-black text-brand-black uppercase text-[11px] md:text-sm tracking-tight block mb-1 md:mb-2">Full Name <span className="text-brand-green">*</span></label>
                  <input id="name" type="text" value={formData.name} onChange={handleInput} className="w-full h-[54px] md:h-14 rounded-lg md:rounded-xl border border-gray-200 bg-gray-50 px-3 md:px-5 text-sm md:text-base text-brand-black font-semibold outline-none focus:border-brand-green focus:bg-white transition-colors" placeholder="e.g. Kagiso Mokope" required />
                </div>

                <div>
                  <label htmlFor="phone" className="font-black text-brand-black uppercase text-[11px] md:text-sm tracking-tight block mb-1 md:mb-2">Phone Number <span className="text-brand-green">*</span></label>
                  <input id="phone" type="tel" value={formData.phone} onChange={handleInput} className="w-full h-[54px] md:h-14 rounded-lg md:rounded-xl border border-gray-200 bg-gray-50 px-3 md:px-5 text-sm md:text-base text-brand-black font-semibold outline-none focus:border-brand-green focus:bg-white transition-colors" placeholder="e.g. 082 123 4567" required />
                </div>

                <div className="col-span-2">
                  <label htmlFor="service" className="font-black text-brand-black uppercase text-[11px] md:text-sm tracking-tight block mb-1 md:mb-2">Service Required <span className="text-brand-green">*</span></label>
                  <div className="relative">
                    <select id="service" value={formData.service} onChange={handleInput} className="w-full h-[54px] md:h-14 rounded-lg md:rounded-xl border border-gray-200 bg-gray-50 px-3 md:px-5 pr-10 md:pr-12 text-sm md:text-base text-brand-black font-semibold outline-none focus:border-brand-green focus:bg-white transition-colors appearance-none cursor-pointer" required>
                      {servicePills.map((pill) => <option key={pill.label} value={pill.label}>{pill.label}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-brand-black pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="date" className="font-black text-brand-black uppercase text-[11px] md:text-sm tracking-tight block mb-1 md:mb-2">Preferred Date <span className="text-brand-green">*</span></label>
                  <input id="date" type="date" value={formData.date} onChange={handleInput} min={new Date().toISOString().split('T')[0]} className="w-full h-[54px] md:h-14 rounded-lg md:rounded-xl border border-gray-200 bg-gray-50 px-3 md:px-5 text-sm md:text-base text-brand-black font-semibold outline-none focus:border-brand-green focus:bg-white transition-colors" required />
                </div>

                <div>
                  <label htmlFor="time" className="font-black text-brand-black uppercase text-[11px] md:text-sm tracking-tight block mb-1 md:mb-2">Time Slot <span className="text-brand-green">*</span></label>
                  <div className="relative">
                    <select id="time" value={formData.time} onChange={handleInput} className="w-full h-[54px] md:h-14 rounded-lg md:rounded-xl border border-gray-200 bg-gray-50 px-3 md:px-5 pr-10 md:pr-12 text-sm md:text-base text-brand-black font-semibold outline-none focus:border-brand-green focus:bg-white transition-colors appearance-none cursor-pointer" required>
                      <option value="" disabled>Choose a slot...</option>
                      {timeSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-brand-black pointer-events-none" />
                  </div>
                </div>

                <div className="col-span-2">
                  <label htmlFor="address" className="font-black text-brand-black uppercase text-[11px] md:text-sm tracking-tight block mb-1 md:mb-2">Full Address <span className="text-brand-green">*</span></label>
                  <div className="flex flex-row gap-2 sm:gap-3">
                    <input id="address" type="text" value={formData.address} onChange={handleInput} className="min-w-0 flex-1 h-[54px] md:h-14 rounded-lg md:rounded-xl border border-gray-200 bg-gray-50 px-3 sm:px-5 text-sm md:text-base text-brand-black font-semibold outline-none focus:border-brand-green focus:bg-white transition-colors" placeholder="e.g. Silverton, Pretoria" required />
                    <button type="button" onClick={handleFindMe} className={`h-[54px] md:h-14 w-20 min-[390px]:w-28 sm:w-48 px-2 sm:px-5 rounded-lg md:rounded-xl font-black uppercase text-[10px] sm:text-sm tracking-tight flex items-center justify-center gap-1 sm:gap-2 transition-colors ${findMeState === 'success' ? 'bg-brand-green text-white' : 'bg-brand-black text-white hover:bg-brand-green'}`}>
                      <Navigation className="w-4 h-4 shrink-0" /> <span className="hidden min-[390px]:inline">{findMeState === 'success' ? 'Located' : 'Auto-Locate'}</span><span className="min-[390px]:hidden">{findMeState === 'success' ? 'Set' : 'Locate'}</span>
                    </button>
                  </div>
                </div>

                <div className="col-span-2">
                  <label htmlFor="details" className="font-black text-brand-black uppercase text-[11px] md:text-sm tracking-tight block mb-1 md:mb-2">Additional Details</label>
                  <textarea id="details" className="w-full min-h-[96px] md:min-h-24 rounded-lg md:rounded-xl border border-gray-200 bg-gray-50 px-3 md:px-5 py-3 md:py-4 text-sm md:text-base text-brand-black font-semibold outline-none focus:border-brand-green focus:bg-white transition-colors resize-y" placeholder="Any specific requirements or questions?" />
                </div>
              </div>

              <div className="pt-4 md:pt-6 flex flex-col items-center">
                <button type="submit" disabled={submitState === 'loading'} className="w-full rounded-lg md:rounded-xl bg-brand-black text-white font-black text-sm md:text-lg tracking-widest uppercase py-4 md:py-5 hover:bg-brand-green transition-all duration-300 flex justify-center items-center gap-2 group disabled:opacity-80 disabled:cursor-not-allowed">
                  <span>{submitState === 'loading' ? 'Processing...' : 'Confirm Booking Request'}</span>
                  {submitState === 'loading' ? <Loader className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                </button>
              </div>

              {successDetails && (
                <div className="bg-green-50 border border-green-200 text-brand-black p-5 rounded-2xl mt-4">
                  <h4 className="font-bold text-brand-green mb-2 flex items-center gap-2 text-sm uppercase tracking-widest"><CheckCircle className="w-4 h-4" /> Request Successful</h4>
                  <div className="text-sm text-gray-600 font-medium">
                    <div className="space-y-1.5 mt-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <p><span className="text-gray-500 font-bold uppercase text-[10px] w-20 inline-block">Name:</span> <span className="text-brand-black">{successDetails.name}</span></p>
                      <p><span className="text-gray-500 font-bold uppercase text-[10px] w-20 inline-block">Phone:</span> <span className="text-brand-black">{successDetails.phone}</span></p>
                      <p><span className="text-gray-500 font-bold uppercase text-[10px] w-20 inline-block">Service:</span> <span className="text-brand-green font-bold">{successDetails.service}</span></p>
                      <p><span className="text-gray-500 font-bold uppercase text-[10px] w-20 inline-block">When:</span> <span className="text-brand-black">{successDetails.date} at {successDetails.time}</span></p>
                      <p><span className="text-gray-500 font-bold uppercase text-[10px] w-20 inline-block align-top">Where:</span> <span className="text-brand-black inline-block max-w-[calc(100%-5rem)]">{successDetails.address}</span></p>
                    </div>
                    <p className="text-brand-black font-medium text-xs mt-4">We will contact you shortly to confirm your booking.</p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-white text-gray-500 py-8 border-t border-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/exec_logo.png" alt="Executive Pro Cleaner logo" className="w-8 h-8 object-contain" width="32" height="32" loading="lazy" decoding="async" />
            <div className="flex flex-col">
              <span className="font-heading font-black text-brand-black uppercase tracking-widest text-xs leading-none">Executive</span>
              <span className="font-heading font-bold text-brand-green uppercase tracking-widest text-[10px] leading-none mt-1">Pro Cleaner</span>
            </div>
          </div>

         <div className="flex flex-col items-center gap-2 my-2 md:my-0">
             <a href="mailto:info@executiveprocleaner.co.za" className="flex items-center gap-2 text-xs text-gray-500 hover:text-brand-green transition-colors duration-300">
                <Mail className="w-4 h-4" />
                <span className="tracking-wide">info@executiveprocleaner.co.za</span>
             </a>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span className="tracking-wide">Silverton, Pretoria</span>
              </div>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="text-xs font-medium tracking-wide uppercase">&copy; {new Date().getFullYear()} Executive Pro Cleaner.</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-36 right-5 z-[90] flex flex-col items-center gap-3">
        <div className={`flex flex-col items-center gap-3 transition-all duration-300 ${chatOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}>
          <a href="https://www.facebook.com/people/Executive-pro-cleaning-services/61563479413723/" target="_blank" rel="noopener noreferrer" aria-label="Open Facebook" className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1877F2] shadow-soft ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1">
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.414c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97H15.83c-1.49 0-1.955.93-1.955 1.884v2.266h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
            </svg>
          </a>
          <a href="https://www.instagram.com/executiveprocleaner/" target="_blank" rel="noreferrer" aria-label="Open Instagram" className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-soft ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1">
            <svg className="h-7 w-7" viewBox="0 0 24 24" aria-hidden="true">
              <defs>
                <linearGradient id="instagramGradient" x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F58529" />
                  <stop offset="0.35" stopColor="#DD2A7B" />
                  <stop offset="0.7" stopColor="#8134AF" />
                  <stop offset="1" stopColor="#515BD4" />
                </linearGradient>
              </defs>
              <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="url(#instagramGradient)" strokeWidth="2" />
              <circle cx="12" cy="12" r="4" fill="none" stroke="url(#instagramGradient)" strokeWidth="2" />
              <circle cx="17.5" cy="6.5" r="1.4" fill="url(#instagramGradient)" />
            </svg>
          </a>
          <a href="https://wa.me/27682975554?text=Hi%20Executive%20Pro%20Cleaner%2C%20I%27d%20like%20to%20chat%20about%20a%20cleaning%20service." target="_blank" rel="noreferrer" aria-label="Open WhatsApp chat" className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#25D366] shadow-soft ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1">
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.5 0 .16 5.34.16 11.91c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.77 1.47h.01c6.56 0 11.91-5.34 11.91-11.91 0-3.18-1.24-6.17-3.47-8.43zM12.08 21.8h-.01a9.88 9.88 0 0 1-5.03-1.38l-.36-.22-3.74.98 1-3.64-.24-.37a9.82 9.82 0 0 1-1.51-5.25c0-5.45 4.44-9.89 9.9-9.89a9.83 9.83 0 0 1 6.99 2.9 9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47a8.9 8.9 0 0 1-1.64-2.04c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
            </svg>
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle live chat options"
          aria-expanded={chatOpen}
          onClick={() => setChatOpen((prev) => !prev)}
          className="inline-flex h-[4.5rem] w-[4.5rem] items-center justify-center text-brand-green transition-all duration-300 hover:-translate-y-1 hover:text-brand-darkGreen"
        >
          <MessageCircle className="h-14 w-14 fill-current" />
        </button>
      </div>

      {popiaReady && !popiaAccepted && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-brand-black/30 p-4">
          <div className="rounded-ui-font w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-brand-black">POPIA Privacy Notice</p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-gray-600">
                We collect your name, phone number, address, service details, and optional location only to respond to enquiries, prepare quotes, and manage cleaning bookings.
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <a href="mailto:info@executiveprocleaner.co.za?subject=POPIA%20Privacy%20Request" className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border border-gray-200 px-5 text-sm font-bold text-brand-black transition-colors hover:border-brand-green hover:text-brand-green">
                Privacy Request
              </a>
              <button type="button" onClick={acceptPopiaNotice} className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-brand-black px-5 text-sm font-bold text-white transition-colors hover:bg-brand-green">
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`fixed inset-0 z-[100] ${isMediaOpen ? 'flex' : 'hidden'} bg-black/95 backdrop-blur-md transition-opacity duration-300 items-center justify-center p-4 sm:p-8`} onClick={() => setIsMediaOpen(false)}>
        <button type="button" className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm z-50" onClick={() => setIsMediaOpen(false)}>
          <X className="w-8 h-8" />
        </button>
        <button type="button" className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full" onClick={(event) => { event.stopPropagation(); goToPrevMedia() }}>
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button type="button" className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full" onClick={(event) => { event.stopPropagation(); goToNextMedia() }}>
          <ChevronRight className="w-8 h-8" />
        </button>
        <div className="relative w-full max-w-6xl h-[88dvh] sm:h-auto sm:aspect-video rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10" onClick={(event) => event.stopPropagation()} onTouchStart={handleMediaTouchStart} onTouchMove={handleMediaTouchMove} onTouchEnd={handleMediaTouchEnd}>
          <img src={mediaImages[activeMediaIndex]} alt={`Executive Pro Cleaner full view ${activeMediaIndex + 1}`} className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-2 rounded-full bg-black/40 backdrop-blur-sm md:hidden">
            {mediaImages.map((_, index) => (
              <button key={`mobile-dot-${index}`} type="button" className={`w-2 h-2 rounded-full ${index === activeMediaIndex ? 'bg-white' : 'bg-white/35'}`} onClick={() => setActiveMediaIndex(index)} aria-label={`Go to media ${index + 1}`} />
            ))}
          </div>
        </div>
      </div>
      <Analytics />
    </div>
  )
}

export default App
