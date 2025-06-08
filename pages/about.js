export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-red-600 mb-4">About CreatorPulse</h1>

      <p className="mb-6 text-gray-700 text-sm">
        Welcome to CreatorPulse — a community-driven review platform for modern digital creators.
        Our mission is to bring transparency, trust, and real experiences to the creator world,
        helping users discover inspiring voices across content platforms and creative spaces.
      </p>

      <h2 className="text-xl font-semibold text-red-600 mb-2">Our Mission</h2>
      <p className="mb-6 text-gray-700 text-sm">
        CreatorPulse empowers users to leave honest, respectful reviews about their experiences
        with influencers, streamers, educators, and creators of all types. We believe in building a
        trusted environment where quality, authenticity, and creative passion shine.
      </p>

      <h2 className="text-xl font-semibold text-red-600 mb-2">Terms & Guidelines</h2>
      <ul className="list-disc pl-6 text-gray-700 text-sm space-y-2">
        <li>Reviews must reflect real experiences. No harassment or hate speech allowed.</li>
        <li>Inappropriate imagery, personal data, or private content is strictly prohibited.</li>
        <li>CreatorPulse reserves the right to remove any content that violates community guidelines.</li>
      </ul>

      <h2 className="text-xl font-semibold text-red-600 mt-8 mb-2">Contact</h2>
      <p className="mb-6 text-gray-700 text-sm">
        For support, questions, or project-related inquiries, contact us at:
        <br />
        <span className="font-medium text-black">creatorpulse.project@gmail.com</span>
      </p>
    </div>
  );
}
