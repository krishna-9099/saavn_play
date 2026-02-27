import { Link } from 'react-router-dom';
import { VisitorCounter } from '../components/VisitorCounter';
import CodeBlock from '../components/ui/CodeBlock';

const Home = () => {
    const features = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
            title: 'Powerful Search',
            description: 'Search for songs, albums, playlists, and artists with advanced query capabilities and filters.',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
            ),
            title: 'Song Details',
            description: 'Retrieve comprehensive song information including lyrics, download URLs, and rich metadata.',
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            title: 'Album Information',
            description: 'Get complete album details with full track listings, cover art, and artist information.',
            color: 'from-orange-500 to-red-500',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            title: 'Artist Profiles',
            description: 'Access artist profiles, top songs, discography, and detailed biography information.',
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
            ),
            title: 'Playlist Access',
            description: 'Fetch playlist details with complete song lists, metadata, and creator information.',
            color: 'from-indigo-500 to-violet-500',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
            ),
            title: 'Radio Stations',
            description: 'Access radio stations and streaming content for endless music discovery.',
            color: 'from-rose-500 to-pink-500',
        },
    ];

    const endpoints = [
        {
            title: 'Search',
            description: 'Search across all content types',
            path: '/api/search',
            icon: '🔍',
        },
        {
            title: 'Song',
            description: 'Get song details and lyrics',
            path: '/api/song',
            icon: '🎵',
        },
        {
            title: 'Album',
            description: 'Retrieve album information',
            path: '/api/album',
            icon: '💿',
        },
        {
            title: 'Artist',
            description: 'Access artist profiles',
            path: '/api/artist',
            icon: '🎤',
        },
        {
            title: 'Playlist',
            description: 'Fetch playlist details',
            path: '/api/playlist',
            icon: '📋',
        },
        {
            title: 'Lyrics',
            description: 'Get song lyrics',
            path: '/api/lyrics',
            icon: '📝',
        },
    ];

    const stats = [
        { label: 'API Endpoints', value: '10+' },
        { label: 'Data Models', value: '8+' },
        { label: 'Dart SDK', value: '^3.0.0' },
        { label: 'License', value: 'MIT' },
    ];

    const exampleCode = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Search for songs
  final songs = await client.search.songs('Malibu - Miley Cyrus');
  
  // Get album details
  final album = await client.album.detailsById('1142502');
  
  // Fetch song details with lyrics
  final songDetails = await client.song.detailsById(['5WXAlMNt']);

  client.close();
}`;

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-background-dark to-background-dark" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/30 via-transparent to-transparent" />

                {/* Animated background elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 lg:pt-16 lg:pb-32">
                    <div className="text-center">
                        {/* Version badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-8">
                            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                            v1.0.1 - Stable Release
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                saavn_play
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                            A powerful and intuitive Dart package for interacting with the JioSaavn API.
                            Search music, retrieve song details, albums, playlists, and more.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                            <Link
                                to="/installation"
                                className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                Get Started
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <a
                                href="https://github.com/krishna-9099/saavn_play"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-gray-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                                View on GitHub
                            </a>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <a href="https://pub.dev/packages/saavn_play" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                <img
                                    src="https://img.shields.io/pub/v/saavn_play.svg"
                                    alt="Pub Version"
                                    className="h-7"
                                />
                            </a>
                            <a href="https://github.com/krishna-9099/saavn_play/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                <img
                                    src="https://img.shields.io/badge/license-MIT-blue.svg"
                                    alt="License"
                                    className="h-7"
                                />
                            </a>
                            <a href="https://github.com/krishna-9099/saavn_play" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                <img
                                    src="https://img.shields.io/github/stars/krishna-9099/saavn_play.svg?style=social"
                                    alt="GitHub Stars"
                                    className="h-7"
                                />
                            </a>
                        </div>

                        {/* Author */}
                        <div className="mt-8 text-gray-500 text-sm">
                            Created by{' '}
                            <a
                                href="https://github.com/krishna-9099"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
                            >
                                Krishan
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-500 text-sm uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visitor Counter */}
            <section className="bg-white/[0.015] border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid gap-8 lg:grid-cols-3 lg:items-center">
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Live visitor count</h2>
                            <p className="text-gray-400 max-w-2xl">
                                This counter increments on each page load and is powered by CounterAPI using the official
                                counter.js client.
                            </p>
                        </div>
                        <div className="max-w-md lg:ml-auto">
                            <VisitorCounter />
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Start Section */}
            <section className="py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Quick Start
                            </h2>
                            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                                Get up and running in minutes. Simply add the dependency,
                                import the package, and start exploring the API.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Simple and intuitive API design',
                                    'Full type safety with Dart',
                                    'Comprehensive error handling',
                                    'Well-documented methods',
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3 text-gray-300">
                                        <svg className="w-5 h-5 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-2xl blur-xl" />
                            <div className="relative">
                                <CodeBlock
                                    code={exampleCode}
                                    language="dart"
                                    title="example.dart"
                                    showLineNumbers
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 lg:py-28 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Powerful Features
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Everything you need to build amazing music applications with the JioSaavn API.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300"
                            >
                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* API Endpoints Section */}
            <section className="py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            API Endpoints
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Explore our comprehensive API endpoints for all your music data needs.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {endpoints.map((endpoint, index) => (
                            <Link
                                key={index}
                                to={endpoint.path}
                                className="group flex items-start gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary-500/30 hover:bg-primary-500/5 transition-all duration-300"
                            >
                                <span className="text-2xl">{endpoint.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors mb-1">
                                        {endpoint.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        {endpoint.description}
                                    </p>
                                </div>
                                <svg className="w-5 h-5 text-gray-600 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link
                            to="/api-reference"
                            className="inline-flex items-center gap-2 px-6 py-3 text-primary-400 hover:text-primary-300 font-medium rounded-lg hover:bg-primary-500/10 transition-all"
                        >
                            View all endpoints
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-900/50 to-purple-900/50 border border-white/10 p-12 text-center">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-500/20 via-transparent to-transparent" />
                        <div className="relative">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Ready to get started?
                            </h2>
                            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
                                Start building your music application today with saavn_play.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    to="/installation"
                                    className="inline-flex items-center px-6 py-3 text-white bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all"
                                >
                                    Installation Guide
                                </Link>
                                <Link
                                    to="/examples"
                                    className="inline-flex items-center px-6 py-3 text-primary-400 hover:text-primary-300 font-medium transition-colors"
                                >
                                    View Examples
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
