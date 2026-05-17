import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24 px-6 bg-[#F4F7FB] min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-gray-100"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#0A0F2C] mb-4">Privacy Policy</h1>
        <p className="text-gray-400 font-medium mb-12">Last Updated: April 2026</p>

        <div className="prose prose-blue max-w-none text-gray-600 space-y-8 leading-relaxed">
          <section>
            <p>
              SORAE ("we", "our") respects your privacy. This Privacy Policy explains how we collect, use, and share your personal information when you visit or make a purchase on our website (as well as through our partners like Shopee, Tokopedia, and TikTok Shop). This policy is designed to comply with digital advertising standards, including Meta Platforms, Inc.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A0F2C] mb-4">1. Personal Information We Collect</h2>
            <p>
              When you visit our site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the site, we collect information about the individual web pages or products (perfume variants) that you view, and information about how you interact with our site. We refer to this automatically-collected information as "Device Information".
            </p>
            <p className="mt-4">
              When you make a purchase through our partner marketplace platforms, we may receive information related to your order shared by those platforms in accordance with their respective privacy policies. We refer to this information as "Order Information".
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A0F2C] mb-4">2. How Do We Use Your Information?</h2>
            <p>
              We use the Order Information to fulfill any orders placed, arrange for shipping, and provide customer service.
              Additionally, we use Device Information and Order Information to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Communicate with you;</li>
              <li>Screen our orders for potential risk or fraud; and</li>
              <li>Advertising Purposes (Important): Provide you with information or targeted advertising (including retargeting ads via Facebook, Instagram, and TikTok) relating to our products or services, according to the preferences you have shared with us.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A0F2C] mb-4">3. Use of Meta Pixel & Third-Party Tracking</h2>
            <p>
              Our site uses Meta Pixel (Facebook Pixel) and similar tracking technologies to understand how users interact with our site and to present relevant advertisements outside of our site. These technologies track actions such as page views and button clicks leading to marketplaces. By using our site, you consent to the collection of this data by third parties (such as Meta and TikTok) for analytic and ad personalization purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A0F2C] mb-4">4. Sharing Your Personal Information</h2>
            <p>
              We share your Personal Information with third parties to help us process orders and analyze site usage (for example: e-commerce platforms like Shopee/Tokopedia/TikTok Shop, and analytics providers like Google Analytics and Meta). We may also share your information to comply with applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A0F2C] mb-4">5. Your Rights & Opt-Out</h2>
            <p>
              If you do not want your data used for targeted advertising, you can opt out by managing your ad preferences in your Facebook/Meta account, or through digital advertising opt-out portals like the Digital Advertising Alliance.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
