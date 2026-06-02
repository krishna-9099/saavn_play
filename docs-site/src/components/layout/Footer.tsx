import CommunityLinks from '../ui/CommunityLinks';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="bg-background-darker/60 backdrop-blur-xl border-t border-white/10 py-8"
            style={{ minHeight: '80px' }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand & Copyright */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-500/20 border border-green-500/30"
                            >
                                <svg
                                    className="w-5 h-5 text-green-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                                    />
                                </svg>
                            </div>
                            <span className="text-lg font-semibold text-white">saavn_play</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">
                            The Modern Dart SDK for JioSaavn API. Type-safe, comprehensive, and easy to use.
                        </p>
                        <span className="text-xs text-gray-500">
                            © {currentYear} saavn_play. Released under the MIT License.
                        </span>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://github.com/krishna-9099/saavn_play"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-200"
                                >
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://pub.dev/packages/saavn_play"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-200"
                                >
                                    pub.dev
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/krishna-9099/saavn_play/issues"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-200"
                                >
                                    Report an Issue
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/krishna-9099/saavn_play/blob/main/LICENSE"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-200"
                                >
                                    MIT License
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Community Links */}
                    <CommunityLinks />
                </div>

                <div className="pt-6 border-t border-white/10">
                    <p className="text-xs text-gray-500 text-center">
                        <strong>Educational Purpose Disclaimer:</strong> This package is intended for educational
                        and research purposes only. It is not affiliated with, endorsed by, or connected to
                        JioSaavn or any of its subsidiaries. Use responsibly and in accordance with applicable
                        terms of service.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
