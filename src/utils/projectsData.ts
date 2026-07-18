export interface Project {
  id: string;
  title: string;
  category: "Flutter" | "Android" | "iOS" | "Backend";
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
}

export const projectsData: Project[] = [
  {
    id: "zenithpay",
    title: "ZenithPay Mobile Wallet",
    category: "Flutter",
    description: "A secure, biometric-enabled fintech wallet and fiat gateway running with BLoC and Clean Architecture.",
    longDescription: "ZenithPay is a high-performance cross-platform financial application offering decentralized wallet storage, fiat integration, and instant transaction notifications. Built using clean architectural layers, it splits concerns across Core, Data, and Presentation, ensuring 95% unit test coverage.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9BhP16DBFX35hanLcHdE20250FpFltn1FUGLxsidw-o9s9YRBnWo6yj5fCegNBuPHz4enPKSAY7mS7HaMbyKtkigiznZYUpQ3_1Oq4QSnpWSJwGfyDPJ16-CPOSEkup1w_TlqeElNX95IWp-ODVabNzfR0CGRxoWeP6vIEknP5yssJOvDDDfX5VCSVjRT8XAj43zP4ZXm-o7-qAct_BdGXXDf4P-O25kaTF4NHYD7e1Q-H5Q9M9hnQB6mum6D8ZvMpGQmSE2mWso",
    tags: ["Flutter", "Dart", "BLoC", "Biometrics", "Secure Storage", "REST API"],
    githubUrl: "https://github.com/sauvikray/zenithpay",
    liveUrl: "https://zenithpay.io",
    features: [
      "Secured Local Auth & FaceID integration via native channel bindings.",
      "Custom reactive graphing engine built on canvas render passes.",
      "Automated PDF statement generation and encrypted export.",
      "Optimized offline synchronization model caching network operations."
    ]
  },
  {
    id: "trace-social",
    title: "TraceSocial Analytics",
    category: "iOS",
    description: "Real-time engagement tracker and influencer dashboard integrating WebSockets and core statistics.",
    longDescription: "TraceSocial is an influencer dashboard monitoring audience analytics, live stream chats, and real-time monetization milestones. Built natively for iOS to leverage high-performance charts, and also ported to Swift UI, it connects directly via WebSockets to ingestion engines.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCT_IcsawJfoN5xsDxzTNLE2cx__ZzdTqY9rY0j7yBNyFS2iQ6VB32Vmp8U8wPx1DZQVFEokXX4j6ufCQ8Tpj-UfyvllFwftWgsw4WFK25sYLNbzJGU7FFJr1FJwBXJidmhP-AYhmqB23Z19doDYDTAJSP059buLVCdtfsEw2_suDDGLafSGMYRPfcJ0EHGK_B5SpVyMMkUFNR3gZT5ABJmZkMU11N_ybTTxbAHmSRslQelDWX3IA-xB1x7RHtMMyagFOEGi9sUc_k",
    tags: ["iOS", "SwiftUI", "WebSockets", "Charts", "CoreData", "Combine"],
    githubUrl: "https://github.com/sauvikray/tracesocial",
    features: [
      "Sub-10ms latency WebSockets chat ingestion.",
      "Advanced engagement analytics with animated bezier pathing.",
      "Modular dashboard tiles supporting drag-and-drop customization.",
      "Native widget integration displaying live subscriber tallies."
    ]
  },
  {
    id: "gourmet-app",
    title: "Vibrant Gourmet App",
    category: "Android",
    description: "On-demand food delivery app utilizing Google Maps API, background workers, and real-time courier tracking.",
    longDescription: "Vibrant Gourmet is a modern gourmet courier network app. It makes heavy use of Android background service hooks for low-power background location telemetry, maps API routing optimizations, and native push integration.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9BhP16DBFX35hanLcHdE20250FpFltn1FUGLxsidw-o9s9YRBnWo6yj5fCegNBuPHz4enPKSAY7mS7HaMbyKtkigiznZYUpQ3_1Oq4QSnpWSJwGfyDPJ16-CPOSEkup1w_TlqeElNX95IWp-ODVabNzfR0CGRxoWeP6vIEknP5yssJOvDDDfX5VCSVjRT8XAj43zP4ZXm-o7-qAct_BdGXXDf4P-O25kaTF4NHYD7e1Q-H5Q9M9hnQB6mum6D8ZvMpGQmSE2mWso",
    tags: ["Android", "Kotlin", "Google Maps API", "JobScheduler", "Retrofit", "MVI"],
    githubUrl: "https://github.com/sauvikray/vibrantgourmet",
    features: [
      "Proprietary battery-friendly geofencing location algorithm.",
      "Custom vector route renderer overlays matching dark-mode maps.",
      "Offline-first order caching utilizing Room DB schemas.",
      "Instant push dispatch notifications via FCM."
    ]
  },
  {
    id: "aurora-dashboard",
    title: "Aurora Luxury Wear API",
    category: "Backend",
    description: "Node.js core microservices orchestrating inventory logistics, webhooks, and secure payments.",
    longDescription: "Aurora is the headless back-office administration engine for high-end luxury e-commerce. Designed in Node.js with TypeScript, it hosts distributed microservices managing inventory tracking, webhook distribution, and Stripe checkout pipelines.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCT_IcsawJfoN5xsDxzTNLE2cx__ZzdTqY9rY0j7yBNyFS2iQ6VB32Vmp8U8wPx1DZQVFEokXX4j6ufCQ8Tpj-UfyvllFwftWgsw4WFK25sYLNbzJGU7FFJr1FJwBXJidmhP-AYhmqB23Z19doDYDTAJSP059buLVCdtfsEw2_suDDGLafSGMYRPfcJ0EHGK_B5SpVyMMkUFNR3gZT5ABJmZkMU11N_ybTTxbAHmSRslQelDWX3IA-xB1x7RHtMMyagFOEGi9sUc_k",
    tags: ["NodeJS", "TypeScript", "Express", "Docker", "Stripe", "PostgreSQL"],
    githubUrl: "https://github.com/sauvikray/aurora-api",
    features: [
      "Distributed cache synchronization utilizing Redis clusters.",
      "PCI-compliant payment pipeline handling complex currencies.",
      "Automated webhooks with smart exponential-backoff retries.",
      "Dockerized deployments scaling dynamically on AWS Fargate."
    ]
  }
];
