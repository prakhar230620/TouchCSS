"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Settings, ExternalLink, Eye, EyeOff, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
    getAIProvider,
    setAIProvider,
    getAPIKey,
    setAPIKey,
    clearAPIKey,
    clearAllData,
    getConfigurationStatus,
    type AIProvider,
} from "@/lib/api-key-storage";
import { getProviderName, getProviderSignupURL } from "@/lib/ai-providers";

interface AISettingsDialogProps {
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function AISettingsDialog({ trigger, open, onOpenChange }: AISettingsDialogProps) {
    const [isOpen, setIsOpen] = useState(false);

    const isControlled = open !== undefined;
    const show = isControlled ? open : isOpen;

    const setShow = (value: boolean) => {
        if (isControlled) {
            onOpenChange?.(value);
        } else {
            setIsOpen(value);
        }
    };
    const [provider, setProviderState] = useState<AIProvider>('gemini');
    const [geminiKey, setGeminiKey] = useState('');
    const [groqKey, setGroqKey] = useState('');
    const [showGeminiKey, setShowGeminiKey] = useState(false);
    const [showGroqKey, setShowGroqKey] = useState(false);
    const { toast } = useToast();

    // Load saved settings when dialog opens
    useEffect(() => {
        if (open) {
            const currentProvider = getAIProvider();
            const geminiApiKey = getAPIKey('gemini') || '';
            const groqApiKey = getAPIKey('groq') || '';

            setProviderState(currentProvider);
            setGeminiKey(geminiApiKey);
            setGroqKey(groqApiKey);
        }
    }, [open]);

    const handleSave = () => {
        // Save provider selection
        setAIProvider(provider);

        // Save API keys
        if (geminiKey.trim()) {
            setAPIKey('gemini', geminiKey);
        } else {
            clearAPIKey('gemini');
        }

        if (groqKey.trim()) {
            setAPIKey('groq', groqKey);
        } else {
            clearAPIKey('groq');
        }

        toast({
            title: "Settings Saved",
            description: `AI provider set to ${getProviderName(provider)}. API keys saved securely in your browser.`,
            duration: 3000,
        });

        setShow(false);
    };

    const handleClearAll = () => {
        clearAllData();
        setProviderState('gemini');
        setGeminiKey('');
        setGroqKey('');

        toast({
            title: "Settings Cleared",
            description: "All AI settings and API keys have been removed.",
            duration: 3000,
        });
    };

    const config = getConfigurationStatus();

    return (
        <Dialog open={show} onOpenChange={setShow}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" size="sm" className="gap-2">
                        <Settings className="h-4 w-4" />
                        AI Settings
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <Settings className="h-6 w-6 text-primary" />
                        AI Provider Settings
                    </DialogTitle>
                    <DialogDescription>
                        Configure your AI provider and API keys. All data is stored locally in your browser.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Security Notice */}
                    <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                            <strong>Privacy Note:</strong> Your API keys are stored locally in your browser's localStorage and are never sent to our servers.
                            All AI requests go directly from your browser to the AI provider.
                        </AlertDescription>
                    </Alert>

                    {/* Provider Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="provider">AI Provider</Label>
                        <Select value={provider} onValueChange={(value) => setProviderState(value as AIProvider)}>
                            <SelectTrigger id="provider">
                                <SelectValue placeholder="Select AI provider" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="gemini">
                                    <div className="flex items-center gap-2">
                                        <span>Google Gemini</span>
                                        {config.geminiConfigured && <CheckCircle className="h-3 w-3 text-green-500" />}
                                    </div>
                                </SelectItem>
                                <SelectItem value="groq">
                                    <div className="flex items-center gap-2">
                                        <span>Groq</span>
                                        {config.groqConfigured && <CheckCircle className="h-3 w-3 text-green-500" />}
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Gemini API Key */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="gemini-key" className="flex items-center gap-2">
                                Google Gemini API Key
                                {config.geminiConfigured && <Badge variant="outline" className="text-green-600 border-green-600">Configured</Badge>}
                            </Label>
                            <Button
                                variant="link"
                                size="sm"
                                className="h-auto p-0 text-xs"
                                onClick={() => window.open(getProviderSignupURL('gemini'), '_blank')}
                            >
                                Get API Key <ExternalLink className="ml-1 h-3 w-3" />
                            </Button>
                        </div>
                        <div className="relative">
                            <Input
                                id="gemini-key"
                                type={showGeminiKey ? "text" : "password"}
                                placeholder="Enter your Gemini API key"
                                value={geminiKey}
                                onChange={(e) => setGeminiKey(e.target.value)}
                                className="pr-10"
                            />
                            <Button
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() => setShowGeminiKey(!showGeminiKey)}
                            >
                                {showGeminiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Free tier available. Get your key from{" "}
                            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                Google AI Studio
                            </a>
                        </p>
                    </div>

                    {/* Groq API Key */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="groq-key" className="flex items-center gap-2">
                                Groq API Key
                                {config.groqConfigured && <Badge variant="outline" className="text-green-600 border-green-600">Configured</Badge>}
                            </Label>
                            <Button
                                variant="link"
                                size="sm"
                                className="h-auto p-0 text-xs"
                                onClick={() => window.open(getProviderSignupURL('groq'), '_blank')}
                            >
                                Get API Key <ExternalLink className="ml-1 h-3 w-3" />
                            </Button>
                        </div>
                        <div className="relative">
                            <Input
                                id="groq-key"
                                type={showGroqKey ? "text" : "password"}
                                placeholder="Enter your Groq API key"
                                value={groqKey}
                                onChange={(e) => setGroqKey(e.target.value)}
                                className="pr-10"
                            />
                            <Button
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() => setShowGroqKey(!showGroqKey)}
                            >
                                {showGroqKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Free tier available. Get your key from{" "}
                            <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                Groq Console
                            </a>
                        </p>
                    </div>

                    {/* Validation Warning */}
                    {provider === 'gemini' && !geminiKey.trim() && (
                        <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                                Please provide a Gemini API key to use this provider.
                            </AlertDescription>
                        </Alert>
                    )}
                    {provider === 'groq' && !groqKey.trim() && (
                        <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                                Please provide a Groq API key to use this provider.
                            </AlertDescription>
                        </Alert>
                    )}
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button variant="outline" onClick={handleClearAll}>
                        Clear All Settings
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setShow(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>
                            Save Settings
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
