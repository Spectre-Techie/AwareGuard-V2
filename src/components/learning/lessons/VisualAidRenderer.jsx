/**
 * @file VisualAidRenderer.jsx
 * @description Multi-modal visual learning aid renderer for enhanced comprehension
 * @version 1.0.0
 * @since 2026-02-10
 * 
 * Supported Visual Aid Types:
 * - comparison: Side-by-side safe vs unsafe examples
 * - checklist: Step-by-step action items
 * - diagram: Visual flow or process diagrams (future)
 * - example: Real-world scenario examples (future)
 * 
 * Features:
 * - Responsive grid layouts
 * - Color-coded visual hierarchy
 * - Icon-based visual cues
 * - Mobile-optimized stacking
 * - Accessibility-first design
 * 
 * @component
 */

import React from "react";
import PropTypes from "prop-types";

/**
 * VisualAidRenderer Component
 * Renders different types of visual learning aids based on type
 * 
 * @param {Object} props - Component props
 * @param {Object} props.visualAid - Visual aid configuration
 * @param {string} props.visualAid.type - Type of visual aid (comparison, checklist, diagram, example)
 * @param {Object} props.visualAid.data - Type-specific data object
 * @param {string} [props.visualAid.title] - Optional title for the visual aid
 * 
 * @returns {JSX.Element|null} Rendered visual aid or null if type not supported
 */
const VisualAidRenderer = ({ visualAid }) => {
    if (!visualAid || !visualAid.type) {
        return null;
    }

    const { type, data, title } = visualAid;

    /**
     * Render comparison visual aid (safe vs unsafe)
     */
    const renderComparison = () => {
        const { safe, unsafe, safeLabel = "Safe", unsafeLabel = "Unsafe" } = data;

        return (
            <div
                className="space-y-3"
                role="region"
                aria-label="Comparison visual aid"
            >
                {title && (
                    <h5 className="font-semibold text-slate-900 dark:text-white text-base mb-4">
                        {title}
                    </h5>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Safe Example */}
                    <div
                        className="bg-green-50 dark:bg-green-500/10 border-2 border-green-500 dark:border-green-500/40 rounded-lg p-5 shadow-sm"
                        role="article"
                        aria-label="Safe example"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <svg
                                className="w-6 h-6 text-green-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-green-900 dark:text-green-300 font-bold text-sm uppercase tracking-wide">
                                {safeLabel}
                            </span>
                        </div>
                        <p className="text-slate-800 dark:text-slate-300 text-sm leading-relaxed font-medium">
                            {safe}
                        </p>
                    </div>

                    {/* Unsafe Example */}
                    <div
                        className="bg-red-50 dark:bg-red-500/10 border-2 border-red-500 dark:border-red-500/40 rounded-lg p-5 shadow-sm"
                        role="article"
                        aria-label="Unsafe example"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <svg
                                className="w-6 h-6 text-red-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-red-900 dark:text-red-300 font-bold text-sm uppercase tracking-wide">
                                {unsafeLabel}
                            </span>
                        </div>
                        <p className="text-slate-800 dark:text-slate-300 text-sm leading-relaxed font-medium">
                            {unsafe}
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    /**
     * Render checklist visual aid
     */
    const renderChecklist = () => {
        const { items = [], checklistTitle = "Action Checklist" } = data;

        return (
            <div
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-5 shadow-sm"
                role="region"
                aria-label="Action checklist"
            >
                <h5 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 text-base">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                    <span>{title || checklistTitle}</span>
                </h5>
                <ul className="space-y-3" role="list">
                    {items.map((item, idx) => (
                        <li
                            key={idx}
                            className="flex items-start gap-3 group"
                        >
                            <div className="flex-shrink-0 mt-0.5">
                                <svg
                                    className="w-5 h-5 text-green-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed flex-1">
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    /**
     * Render example visual aid
     */
    const renderExample = () => {
        const { scenario, explanation } = data;

        return (
            <div
                className="bg-amber-50 dark:bg-amber-500/10 border-l-4 border-amber-500 rounded-lg p-5 shadow-sm"
                role="region"
                aria-label="Real-world example"
            >
                {title && (
                    <h5 className="font-bold text-amber-900 dark:text-amber-300 mb-3 flex items-center gap-2 text-base">
                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        <span>{title}</span>
                    </h5>
                )}
                <div className="space-y-3">
                    <div className="bg-white dark:bg-slate-800 rounded-md p-4 border border-amber-200 dark:border-amber-500/30">
                        <p className="text-slate-800 dark:text-slate-300 text-sm leading-relaxed italic">
                            "{scenario}"
                        </p>
                    </div>
                    {explanation && (
                        <p className="text-amber-900 dark:text-amber-200 text-sm leading-relaxed font-medium">
                            {explanation}
                        </p>
                    )}
                </div>
            </div>
        );
    };

    /**
     * Render diagram visual aid (placeholder for future implementation)
     */
    const renderDiagram = () => {
        return (
            <div
                className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-lg p-5 shadow-sm"
                role="region"
                aria-label="Diagram"
            >
                <p className="text-indigo-900 dark:text-indigo-300 text-sm">
                    Diagram visualization coming soon...
                </p>
            </div>
        );
    };

    // Route to appropriate renderer based on type
    switch (type) {
        case 'comparison':
            return renderComparison();
        case 'checklist':
            return renderChecklist();
        case 'example':
            return renderExample();
        case 'diagram':
            return renderDiagram();
        default:
            console.warn(`Unknown visual aid type: ${type}`);
            return null;
    }
};

// PropTypes for Development-Time Type Checking
VisualAidRenderer.propTypes = {
    visualAid: PropTypes.shape({
        type: PropTypes.oneOf(['comparison', 'checklist', 'example', 'diagram']).isRequired,
        data: PropTypes.object.isRequired,
        title: PropTypes.string,
    }).isRequired,
};

export default VisualAidRenderer;
