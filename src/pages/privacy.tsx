import Container from "@/components/container2"
import Meta from "@/components/meta"

export default function about() {
    return (
      <Container>
        <Meta title="Privacy Policy" />
        <div className="mt-10">
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
            <section className="mt-5 text-xl font-light space-y-5">
                <p>
                    This Privacy Policy explains how we collect, use, and share your personal information when you visit and use our website. We understand the importance of your privacy and are committed to protecting it in accordance with the Thai Personal Data Protection Act (PDPA) and other applicable laws.
                </p>
                <h2 className="text-2xl font-bold">Information We Collect</h2>
                <p>
                    We collect only the data that Vercel and Google Analytics collect when you use our website. This data may include:
                </p>
                <li>
                    Usage data: This includes information about how you use our website, such as the pages you visit, the time you spend on each page, and the links you click.
                </li>
                <li>
                    Device information: This includes information about the device you use to access our website, such as your IP address, operating system, browser type, and unique device identifiers.
                </li>
                <h2 className="text-2xl font-bold">Purpose of Data Collection</h2>
                <p>
                    We exclusively use collected data for academic purposes and the benefit of education. Including, understanding website usage patterns to improve user experience and analyzing trends and user behavior to inform academic research and development.
                </p>
                <h2 className="text-2xl font-bold">Your Rights</h2>
                <p>
                    You have the right to access, correct, or delete your personal information within the limits of academic research purposes. Please contact us through our website or at contact@cudseereg.com to exercise these rights.
                </p>
                <h2 className="text-2xl font-bold">Changes to This Privacy Policy</h2>
                <p>
                    We may update this policy periodically. We will notify you through the website or other means before changes take effect.
                </p>
                <h2 className="text-2xl font-bold">Contact Us</h2>
                <p>
                    If you have questions about this policy, please contact us at contact@cudseereg.com.
                </p>
                

            </section>
        </div>
      </Container>
    )
  }
  