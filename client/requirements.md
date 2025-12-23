## Packages
@elevenlabs/react | Official React SDK for ElevenLabs Conversational AI
framer-motion | Complex animations for level transitions and UI elements
lucide-react | Icons for UI controls (mic, settings, etc.)

## Notes
Assets are expected to be in /assets/ public directory:
- /assets/kitchen_bg.jpg
- /assets/apartment_path.jpg
- /assets/xylax.jpg
- /assets/toaster.jpg
- /assets/level_green.jpg

ElevenLabs Agent configuration:
- Expects a Client Tool named 'complete_level' with parameter 'target_level' (number)
- Takes dynamic variables: 'persona', 'objective', 'hook'
