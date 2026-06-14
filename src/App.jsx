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
  Lock,
  MapPin,
  Menu,
  Navigation,
  Plus,
  ShieldCheck,
  Sofa,
  Square,
  Star,
  X,
} from 'lucide-react'

const initialForm = {
  name: '',
  phone: '',
  service: 'Office cleaning',
  date: '',
  time: '',
  address: '',
}

const mediaImages = Array.from({ length: 21 }, (_, i) => `/media/job-${String(i + 1).padStart(2, '0')}.jpg`)
const mediaPanelClass = 'relative w-full aspect-video md:aspect-auto md:w-[668px] md:h-[683px] md:max-w-full md:mt-10 lg:mt-14 md:justify-self-end overflow-hidden bg-gray-100'
const aboutMediaPanelClass = 'reveal active relative w-full aspect-video md:aspect-auto md:w-[668px] md:h-[506px] md:max-w-full md:mt-0 md:justify-self-end overflow-hidden bg-gray-100'
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
    lines: [
      ['160cm x 230cm', 'R300'],
      ['200cm x 290cm', 'R400'],
      ['250cm x 350cm', 'R500'],
      ['300cm x 400cm', 'R600'],
    ],
  },
  {
    title: 'Upholstery',
    service: 'Dining chairs',
    icon: Sofa,
    lines: [
      ['1 Seater Couch', 'R300'],
      ['2 Seater Couch', 'R400'],
      ['3 Seater Couch', 'R500'],
      ['4 Seater Couch', 'R600'],
      ['Single/3Q Mattress', 'R350'],
      ['King/Queen Mattress', 'R550'],
    ],
  },
  {
    title: 'Full Home Clean',
    service: 'Other / Multiple Services',
    icon: Home,
    lines: [
      ['1 Bedroom House', 'R800'],
      ['2 Bedrooms House', 'R1200'],
      ['3 Bedrooms House', 'R1800'],
      ['4 Bedrooms House', 'R3000'],
    ],
  },
  {
    title: 'Cars Deep Cleaning',
    service: 'Car interior',
    icon: Car,
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
    lines: [
      ['Standard (up to 5)', 'R400'],
      ['Large (up to 10)', 'R600'],
      ['Complete House (up to 20)', 'R850'],
    ],
  },
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
  const [mapSrc, setMapSrc] = useState(defaultMapSrc)
  const hideSuccessTimer = useRef(null)
  const touchStartX = useRef(null)
  const touchCurrentX = useRef(null)

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

      <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="w-full px-4 sm:px-8 lg:px-14">
          <div className="flex justify-between items-center py-4 min-h-[4.5rem]">
            <a href="#" className="flex items-center gap-3 shrink-0 group smooth-hover hover:opacity-80 md:ml-8 lg:ml-24 xl:ml-[14vw]" onClick={onAnchorClick('#')}>
              <div className="relative w-14 h-14 sm:w-14 sm:h-14">
                <img src="/exec_logo.png" alt="Executive Pro Cleaner logo" className="w-full h-full object-contain" width="56" height="56" loading="eager" fetchPriority="high" decoding="sync" />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="font-heading font-black text-xl md:text-2xl leading-none tracking-tighter text-brand-black uppercase">Executive</h1>
                <h2 className="font-heading font-bold text-xs md:text-xs leading-none tracking-widest text-brand-black uppercase -mt-1">Pro Cleaner</h2>
              </div>
            </a>

            <div className="hidden md:flex flex-1 max-w-[760px] items-center justify-center gap-12 lg:gap-16 xl:gap-20 ml-auto mr-8">
              <a href="#about" className="rounded-ui-font font-bold text-lg tracking-wide text-brand-black hover:text-brand-green transition-colors uppercase" onClick={onAnchorClick('#about')}>About</a>
              <a href="#services" className="rounded-ui-font font-bold text-lg tracking-wide text-brand-black hover:text-brand-green transition-colors uppercase" onClick={onAnchorClick('#services')}>Services</a>
              <a href="#pricing" className="rounded-ui-font font-bold text-lg tracking-wide text-brand-black hover:text-brand-green transition-colors uppercase" onClick={onAnchorClick('#pricing')}>Pricing</a>
              <a href="#contact" className="rounded-ui-font w-44 min-h-[60px] bg-brand-black text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-brand-green transition-all duration-300 shadow-soft hover:shadow-hover text-center flex items-center justify-center group" onClick={onAnchorClick('#contact')}>Book Now</a>
            </div>

            <div className="md:hidden flex items-center">
              <button className="text-brand-black hover:text-brand-green focus:outline-none p-2" onClick={() => setMobileOpen((prev) => !prev)}>
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className={`${mobileOpen ? 'block' : 'hidden'} md:hidden bg-white border-b border-gray-100 absolute w-full shadow-2xl z-40`}>
          <div className="px-6 pt-4 pb-8 space-y-4 flex flex-col">
            <a href="#about" className="mobile-link block font-bold text-lg text-brand-black hover:text-brand-green transition-colors" onClick={onAnchorClick('#about')}>About Us</a>
            <a href="#services" className="mobile-link block font-bold text-lg text-brand-black hover:text-brand-green transition-colors" onClick={onAnchorClick('#services')}>Our Services</a>
            <a href="#pricing" className="mobile-link block font-bold text-lg text-brand-black hover:text-brand-green transition-colors" onClick={onAnchorClick('#pricing')}>Transparent Pricing</a>
            <a href="#contact" className="mobile-link block font-bold text-lg text-brand-black hover:text-brand-green transition-colors" onClick={onAnchorClick('#contact')}>Book a Service</a>
            <a href="#contact" className="mobile-link mt-4 w-full bg-brand-green text-white px-4 py-4 rounded-xl font-bold text-center shadow-md flex justify-center items-center gap-2 group" onClick={onAnchorClick('#contact')}>Book Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></a>
          </div>
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
                  <a href="#contact" className="w-full sm:w-44 min-h-[60px] bg-brand-black text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-brand-green transition-all duration-300 shadow-soft hover:shadow-hover text-center flex items-center justify-center group" onClick={onAnchorClick('#contact')}>Book Now</a>
                  <a href="#pricing" className="w-full sm:w-44 min-h-[60px] bg-white text-brand-black border-2 border-gray-200 px-8 py-3.5 rounded-xl font-bold text-lg hover:border-brand-black transition-all duration-300 text-center flex items-center justify-center" onClick={onAnchorClick('#pricing')}>View Pricing</a>
                </div>

                <button type="button" className="rounded-ui-font text-brand-green font-bold text-sm uppercase tracking-widest inline-flex items-center gap-2 hover:text-brand-black transition-colors" onClick={() => setIsMediaOpen(true)}>
                  View Our Work <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className={mediaPanelClass}>
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
              </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-[5.5rem] min-h-[calc(100vh-5.5rem)] flex items-start pt-28 pb-16 lg:pt-32 lg:pb-24 relative z-10 bg-gray-50 border-t border-gray-100">
          <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
            <div className="grid md:grid-cols-[52%_48%] gap-8 lg:gap-14 items-start">
              <div className="reveal active">
                <p className="rounded-ui-font text-brand-green font-black text-sm uppercase tracking-[0.28em] mb-4">About</p>
                <h2 className="font-heading font-black text-5xl md:text-6xl lg:text-7xl text-brand-black tracking-tighter uppercase leading-[0.95]">
                  Company <span className="text-brand-green">Overview</span>
                </h2>
                <p className="rounded-ui-font text-brand-black text-xl md:text-2xl leading-relaxed mt-8 font-semibold max-w-4xl">
                  Established in 2023 and founded by Kagiso Mokope Ngwepe in Pretoria, Executive Pro Cleaner delivers reliable residential and commercial cleaning at highly competitive prices. We utilize professional-grade equipment and eco-aware products to ensure a pristine, safe environment. We are proud to have provided our services to notable clients and projects, including Bed World Factory, Christ Embassy, and Hatfield Toyota.
                </p>
                <div className="rounded-ui-font mt-7 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex -space-x-3">
                    {clientLogos.map((client) => (
                      <div key={client.name} className={`relative w-12 h-12 rounded-full border-2 border-gray-50 shadow-sm flex items-center justify-center overflow-hidden ring-1 ring-gray-200 ${client.className ?? 'bg-white text-brand-black'}`} title={client.name}>
                        <span className="absolute inset-0 flex items-center justify-center font-black text-sm">{client.initials}</span>
                        <img src={client.logo} alt={`${client.name} logo`} className="relative z-10 w-6 h-6 object-contain" loading="lazy" decoding="async" />
                      </div>
                    ))}
                    <div className="w-12 h-12 rounded-full bg-brand-green border-2 border-gray-50 shadow-sm flex items-center justify-center text-white font-black text-sm ring-1 ring-brand-green/20">
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

        <section id="services" className="scroll-mt-[5.5rem] py-16 lg:py-24 relative z-10 bg-white">
          <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
            <div className="grid lg:grid-cols-[34%_66%] gap-10 lg:gap-16 items-start">
              <div className="reveal active">
                <p className="rounded-ui-font text-brand-green font-black text-sm uppercase tracking-[0.28em] mb-4">Services</p>
                <h2 className="font-heading font-black text-5xl md:text-6xl lg:text-7xl text-brand-black tracking-tighter uppercase leading-[0.95]">
                  Core <span className="text-brand-green">Services</span>
                </h2>
                <p className="rounded-ui-font text-brand-black text-xl leading-relaxed mt-8 font-semibold max-w-xl">Modular, scalable cleaning solutions designed for maximum hygiene.</p>
              </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <div key={service.title} className="bento-card reveal active min-h-[148px] p-6 rounded-2xl shadow-sm bg-white border border-gray-100 flex items-start gap-5 group hover:border-brand-green" style={{ transitionDelay: `${index * 50}ms` }}>
                    <div className="icon-box w-12 h-12 shrink-0 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="rounded-ui-font text-base font-black text-brand-black mb-1.5 uppercase tracking-tight">{service.title}</h3>
                      <p className="rounded-ui-font text-sm text-gray-600 font-semibold leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                )
              })}
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-12 lg:py-16 relative z-10 bg-white border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 reveal flex flex-col items-center">
              <h2 className="font-heading font-black text-3xl md:text-4xl text-brand-black tracking-tight uppercase">Transparent <span className="text-brand-green">Pricing</span></h2>
              <div className="w-20 h-1.5 bg-brand-green mt-4 mb-4 rounded-full" />
              <p className="text-gray-500 font-medium max-w-2xl text-base">Clear, upfront rates with no hidden fees.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {pricingCards.map((card, index) => {
                const Icon = card.icon
                return (
                  <div key={card.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-6 reveal smooth-hover hover:shadow-soft group flex flex-col" style={{ transitionDelay: `${index * 50}ms` }}>
                    <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-4">
                      <div className="bg-brand-light p-2.5 rounded-lg text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
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
                    <a href="#contact" className="block w-full text-center py-2.5 rounded-lg bg-gray-50 text-brand-green font-bold text-xs uppercase tracking-wider border border-gray-200 group-hover:bg-brand-green group-hover:text-white group-hover:border-brand-green transition-all duration-300" onClick={addToBooking(card.service)}>Add to Booking</a>
                  </div>
                )
              })}

              <div className="bg-brand-green rounded-2xl shadow-sm border border-brand-darkGreen p-5 lg:p-6 reveal smooth-hover hover:shadow-soft group flex flex-col justify-center items-center text-center" style={{ transitionDelay: '250ms' }}>
                <Info className="w-8 h-8 text-white mb-3" />
                <h3 className="font-heading font-bold text-base uppercase text-white mb-2">Custom Quote?</h3>
                <p className="text-brand-light font-medium text-xs mb-5">Need office cleaning or a custom combination? Contact us for a tailored quote.</p>
                <a href="#contact" className="block w-full text-center py-2.5 rounded-lg bg-white text-brand-green font-bold text-xs uppercase tracking-wider hover:bg-brand-light transition-all duration-300" onClick={onAnchorClick('#contact')}>Contact Us</a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 lg:py-24 bg-gray-50 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 reveal">
            <div className="text-center mb-12 flex flex-col items-center">
              <h2 className="font-heading font-black text-3xl md:text-4xl text-brand-black tracking-tight uppercase">Request a <span className="text-brand-green">Cleaning</span></h2>
              <div className="w-20 h-1.5 bg-brand-green mt-4 mb-4 rounded-full" />
              <p className="text-gray-600 font-medium text-base max-w-xl">Complete the details below. We'll confirm your slot within minutes.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden group hover:border-brand-green/50 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-brand-green font-black text-sm">1</div>
                  <h3 className="font-heading font-bold text-brand-black uppercase tracking-widest text-sm">Select Service</h3>
                </div>

                <div className="flex flex-wrap gap-3 max-h-[160px] overflow-y-auto hide-scrollbar pb-1">
                  {servicePills.map((pill) => {
                    const Icon = pill.icon
                    const active = formData.service === pill.label
                    return (
                      <button
                        key={pill.label}
                        type="button"
                        onClick={() => selectService(pill.label)}
                        className={`service-pill px-5 py-3 rounded-xl flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider transition-all border ${active ? 'bg-brand-green text-white border-brand-green shadow-sm' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-brand-green hover:bg-green-50'}`}
                      >
                        <Icon className="w-4 h-4" /> {pill.short}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm group hover:border-brand-green/50 transition-colors">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-brand-green font-black text-sm">2</div>
                    <h3 className="font-heading font-bold text-brand-black uppercase tracking-widest text-sm">Your Details</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="relative bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-brand-green focus-within:bg-white transition-all duration-300">
                      <input id="name" type="text" value={formData.name} onChange={handleInput} className="peer w-full px-5 pt-6 pb-2.5 bg-transparent text-brand-black font-medium outline-none placeholder-transparent" placeholder="Full Name" required />
                      <label htmlFor="name" className="absolute left-5 top-4 text-gray-500 text-xs font-bold uppercase tracking-widest transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-brand-green pointer-events-none">Full Name</label>
                    </div>
                    <div className="relative bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-brand-green focus-within:bg-white transition-all duration-300">
                      <input id="phone" type="tel" value={formData.phone} onChange={handleInput} className="peer w-full px-5 pt-6 pb-2.5 bg-transparent text-brand-black font-medium outline-none placeholder-transparent" placeholder="Phone Number" required />
                      <label htmlFor="phone" className="absolute left-5 top-4 text-gray-500 text-xs font-bold uppercase tracking-widest transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-brand-green pointer-events-none">Phone Number</label>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm group hover:border-brand-green/50 transition-colors">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-brand-green font-black text-sm">3</div>
                    <h3 className="font-heading font-bold text-brand-black uppercase tracking-widest text-sm">Schedule</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="relative bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-brand-green focus-within:bg-white transition-all duration-300">
                      <input id="date" type="date" value={formData.date} onChange={handleInput} min={new Date().toISOString().split('T')[0]} className="peer w-full px-5 pt-6 pb-2.5 bg-transparent text-brand-black font-medium outline-none" required />
                      <label htmlFor="date" className="absolute left-5 top-2 text-gray-500 peer-focus:text-brand-green text-[9px] font-bold uppercase tracking-widest pointer-events-none transition-colors">Preferred Date</label>
                    </div>
                    <div className="relative bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-brand-green focus-within:bg-white transition-all duration-300">
                      <select id="time" value={formData.time} onChange={handleInput} className="peer w-full px-5 pt-6 pb-2.5 bg-transparent text-brand-black font-medium outline-none appearance-none cursor-pointer" required>
                        <option value="" disabled>Choose a slot...</option>
                        {timeSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
                      </select>
                      <label htmlFor="time" className="absolute left-5 top-2 text-gray-500 peer-focus:text-brand-green text-[9px] font-bold uppercase tracking-widest pointer-events-none transition-colors">Time Slot</label>
                      <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-gray-500 mt-3">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-6 md:gap-8 group hover:border-brand-green/50 transition-colors">
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-brand-green font-black text-sm">4</div>
                    <h3 className="font-heading font-bold text-brand-black uppercase tracking-widest text-sm">Location</h3>
                  </div>
                  <div className="relative bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-brand-green focus-within:bg-white transition-all duration-300 mb-4">
                    <input id="address" type="text" value={formData.address} onChange={handleInput} className="peer w-full px-5 pt-6 pb-2.5 bg-transparent text-brand-black font-medium outline-none placeholder-transparent" placeholder="Full Address" required />
                    <label htmlFor="address" className="absolute left-5 top-4 text-gray-500 text-xs font-bold uppercase tracking-widest transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-brand-green pointer-events-none">Full Address</label>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed mt-auto hidden md:block">Accurate locations ensure our team arrives promptly with the correct equipment for your space.</p>
                </div>

                <div className="flex-1 relative min-h-[200px] bg-gray-100 rounded-2xl border border-gray-200 flex flex-col items-center justify-center overflow-hidden transition-all duration-300">
                  <div className={`text-center p-6 z-10 flex flex-col items-center justify-center absolute inset-0 bg-gray-50/80 backdrop-blur-sm transition-opacity duration-500 ${findMeState === 'success' ? 'opacity-0 pointer-events-none' : ''}`}>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 text-brand-green shadow-sm border border-gray-100">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <button type="button" onClick={handleFindMe} className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase flex items-center gap-2 transition-all duration-300 shadow-md group ${findMeState === 'success' ? 'bg-brand-darkGreen text-white' : 'bg-brand-black text-white hover:bg-brand-green'}`}>
                      {locationButtonContent[findMeState]}
                    </button>
                  </div>

                  <iframe title="Service location map" src={mapSrc} className="absolute inset-0 w-full h-full border-0 opacity-100 transition-opacity duration-700" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
              </div>

              <div className="pt-4 flex flex-col items-center">
                <button type="submit" disabled={submitState === 'loading'} className="w-full bg-brand-green text-white font-bold text-sm tracking-widest uppercase py-5 rounded-2xl hover:bg-brand-darkGreen transition-all duration-300 flex justify-center items-center gap-2 group shadow-[0_10px_20px_-5px_rgba(34,122,51,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(34,122,51,0.4)] hover:-translate-y-1 disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                  <span>{submitState === 'loading' ? 'Processing...' : 'Confirm Booking Request'}</span>
                  {submitState === 'loading' ? <Loader className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                </button>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> SSL Secure</div>
                  <span className="text-gray-300 hidden sm:inline">&bull;</span>
                  <div className="flex items-center gap-1.5 text-brand-black"><Star className="w-3.5 h-3.5 text-brand-green fill-current" /> 5.0 Rated</div>
                  <span className="text-gray-300 hidden sm:inline">&bull;</span>
                  <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Fully Insured</div>
                </div>
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

          <div className="flex items-center gap-8 my-2 md:my-0">
            <a href="https://instagram.com/executiveprocleaner" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-gray-500 hover:text-brand-green transition-colors duration-300"><Instagram className="w-5 h-5" /></a>
            <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-brand-green transition-colors duration-300"><Facebook className="w-5 h-5" /></a>
            <a href="#" aria-label="TikTok" className="text-gray-500 hover:text-brand-green transition-colors duration-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="text-xs font-medium tracking-wide uppercase">&copy; {new Date().getFullYear()} Executive Pro Cleaner.</p>
          </div>
        </div>
      </footer>

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
    </div>
  )
}

export default App
