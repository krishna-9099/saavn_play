import { colors } from '../../theme';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="bg-background-darker border-t border-border py-8"
            style={{ minHeight: '80px' }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Logo and copyright */}
                    <div className="flex items-center gap-3">
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: colors.primary[500] }}
                        >
                            <svg
                                className="w-5 h-5 text-white"
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
                        <span className="text-sm text-gray-400">
                            © {currentYear} saavn_play. Released under the MIT License.
                        </span>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6">
                        <a
                            href="https://github.com/krishna-9099/saavn_play"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://pub.dev/packages/saavn_play"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            pub.dev
                        </a>
                        <a
                            href="https://github.com/krishna-9099/saavn_play/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            Report an Issue
                        </a>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-6 pt-6 border-t border-border">
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