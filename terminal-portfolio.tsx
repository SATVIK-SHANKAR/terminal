"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

interface SkillBarProps {
  name: string
  percentage: number
  delay?: number
}

const SkillBar: React.FC<SkillBarProps> = ({ name, percentage, delay = 0 }) => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage)
    }, delay)

    return () => clearTimeout(timer)
  }, [percentage, delay])

  return (
    <div className="flex items-center">
      <span className="w-48">{name}</span>
      <div className="flex items-center ml-4">
        <div className="bg-gray-700 h-4 w-48 mr-2 relative overflow-hidden">
          <div
            className="bg-green-400 h-full transition-all duration-1000 ease-out"
            style={{ width: `${width}%` }}
          ></div>
        </div>
        <span>{percentage}%</span>
      </div>
    </div>
  )
}

interface CommandOutput {
  command: string
  output: React.ReactNode
}

export default function TerminalPortfolio() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<CommandOutput[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const commands = {
    help: () => (
      <div className="space-y-2">
        <div>Available commands:</div>
        <div className="ml-4 space-y-1">
          <div>
            <span className="text-white">help, h</span>
            <span className="ml-12">
              - <span className="text-red-400">Show this help message</span>
            </span>
          </div>
          <div>
            <span className="text-white">about, whoami</span>
            <span className="ml-4">
              - <span className="text-green-400">Learn about me</span>
            </span>
          </div>
          <div>
            <span className="text-white">projects, ls</span>
            <span className="ml-8">
              - <span className="text-blue-400">View my projects</span>
            </span>
          </div>
          <div>
            <span className="text-white">skills</span>
            <span className="ml-12">
              - <span className="text-yellow-400">See my technical skills</span>
            </span>
          </div>
          <div>
            <span className="text-white">contact</span>
            <span className="ml-11">
              - <span className="text-red-400">Get in touch</span>
            </span>
          </div>
          <div>
            <span className="text-white">experience</span>
            <span className="ml-7">
              - <span className="text-green-400">View work experience</span>
            </span>
          </div>
          <div>
            <span className="text-white">education</span>
            <span className="ml-8">
              - <span className="text-blue-400">Academic background</span>
            </span>
          </div>
          <div>
            <span className="text-white">clear, cls</span>
            <span className="ml-8">
              - <span className="text-yellow-400">Clear terminal</span>
            </span>
          </div>
          <div>
            <span className="text-white">github</span>
            <span className="ml-11">
              - <span className="text-red-400">Open GitHub profile</span>
            </span>
          </div>
          <div>
            <span className="text-white">linkedin</span>
            <span className="ml-9">
              - <span className="text-green-400">Open LinkedIn profile</span>
            </span>
          </div>
          <div>
            <span className="text-white">resume</span>
            <span className="ml-11">
              - <span className="text-blue-400">Download resume</span>
            </span>
          </div>
          <div>
            <span className="text-white">exit</span>
            <span className="ml-15">
              - <span className="text-red-400">Exit the terminal</span>
            </span>
          </div>
          <div>
            <span className="text-white">joke</span>
            <span className="ml-15">
              - <span className="text-yellow-400">Tell a joke</span>
            </span>
          </div>
        </div>
      </div>
    ),
    h: () => commands.help(),
    about: () => (
      <div className="space-y-2">
        <div className="text-yellow-400">export NAME="Satvik Shankar"</div>
        <div className="text-yellow-400">export ROLE="Full Stack Developer & Finance Enthusiast"</div>
        <div className="text-yellow-400">export LOCATION="New Delhi, IND → Remote Worldwide"</div>
        <div className="text-yellow-400">export EXPERIENCE="since childhood"</div>
        <div></div>
        <div className="text-red-400">A Full Stack Developer who:</div>
        <div>• Writes code that works on the first try (just kidding, that's impossible)</div>
        <div>• Debugs with console.log() like a true artist 🎨</div>
        <div>• Believes in <span className="text-blue-400">"it works on my machine"</span> philosophy</div>
        <div>• Created my first website at 17 y/o</div>
        <div>• Working on a Micro Finance Startup</div>
        <div></div>
        <div className="text-red-400">Hobbies and interests outside coding:</div>
        <div>~/interests/sports → Badminton, Hiking</div>
        <div>~/interests/music → Guitar, Piano</div>
        <div>~/interests/adventure → Travel, Photography, Sky Diving</div>
        <div>~/interests/games → Strategy games, Tennis</div>
        <div className="text-red-400">More Me:</div>
        <div>• Freelance video editor and developer</div>
        <div>• Capture moments through photography as a hobby</div>
        <div>• Learning Spanish</div>
        <div></div>
        <div className="text-green-400">
          console.log("Fun fact: I have 99 problems, but a bug ain't one... wait, that's a lie.");
        </div>
      </div>
    ),
    whoami: () => commands.about(),
    projects: () => (
      <div className="space-y-2">
        <div>My Projects:</div>
        <div></div>
        <div>
          📱 <span className="text-blue-400">E-Commerce Platform</span> - Full-stack React/Node.js application
        </div>
        <div>
          🌐 <span className="text-green-400">Portfolio Website</span> - This terminal-style portfolio you're viewing
        </div>
        <div>
          🔧 <span className="text-yellow-400">DevOps Automation Tools</span> - CI/CD pipeline optimization scripts
        </div>
        <div>
          📊 <span className="text-purple-400">Data Visualization Dashboard</span> - Interactive analytics platform
        </div>
        <div>
          🎮 <span className="text-red-400">Game Development</span> - Various indie game projects
        </div>
        <div></div>
        <div>Visit my GitHub to see more projects and contributions!</div>
      </div>
    ),
    ls: () => commands.projects(),
    skills: () => (
      <div className="space-y-3">
        <div>
          📁 <span className="text-yellow-400">Technical Skills:</span>
        </div>
        <div></div>

        <div className="text-blue-400">Languages:</div>
        <div className="ml-2 space-y-1">
          <SkillBar name="JavaScript/TypeScript" percentage={95} delay={100} />
          <SkillBar name="Python" percentage={85} delay={200} />
          <SkillBar name="Java" percentage={70} delay={300} />
          <SkillBar name="Go" percentage={60} delay={400} />
        </div>

        <div className="text-blue-400">Frontend:</div>
        <div className="ml-2 space-y-1">
          <SkillBar name="React/Next.js" percentage={95} delay={500} />
          <SkillBar name="Vue.js" percentage={75} delay={600} />
          <SkillBar name="HTML5/CSS3" percentage={90} delay={700} />
          <SkillBar name="Tailwind CSS" percentage={85} delay={800} />
        </div>

        <div className="text-blue-400">Backend:</div>
        <div className="ml-2 space-y-1">
          <SkillBar name="Node.js/Express" percentage={90} delay={900} />
          <SkillBar name="Python/Django" percentage={80} delay={1000} />
          <SkillBar name="PostgreSQL/MongoDB" percentage={75} delay={1100} />
        </div>

        <div className="text-blue-400">DevOps & Tools:</div>
        <div className="ml-2 space-y-1">
          <SkillBar name="Docker/Kubernetes" percentage={75} delay={1200} />
          <SkillBar name="AWS/GCP" percentage={70} delay={1300} />
          <SkillBar name="Git/GitHub" percentage={95} delay={1400} />
        </div>
      </div>
    ),
    contact: () => (
      <div className="space-y-2">
        <div>
          📞 <span className="text-yellow-400">Get In Touch:</span>
        </div>
        <div></div>
        <div>
          📧 <span className="text-white">Email:</span> jason.myers@email.com
        </div>
        <div>
          💼 <span className="text-white">LinkedIn:</span> linkedin.com/in/jasonmyers
        </div>
        <div>
          🐙 <span className="text-white">GitHub:</span> github.com/jasonmyers
        </div>
        <div>
          🐦 <span className="text-white">Twitter:</span> @jasonmyers_dev
        </div>
        <div>
          🌐 <span className="text-white">Website:</span> jasonmyers.dev
        </div>
        <div></div>
        <div>I'm always open to discussing new opportunities,</div>
        <div>collaborations, or just having a chat about technology!</div>
        <div></div>
        <div>Response time: Usually within 24 hours ⚡</div>
      </div>
    ),
    experience: () => (
      <div className="space-y-2">
        <div>Work Experience:</div>
        <div></div>
        <div>
          <span className="text-blue-400">Senior Full Stack Developer</span> | TechCorp Inc. (2022-Present)
        </div>
        <div>• Led development of microservices architecture</div>
        <div>• Mentored junior developers and conducted code reviews</div>
        <div>• Improved application performance by 40%</div>
        <div></div>
        <div>
          <span className="text-green-400">Full Stack Developer</span> | StartupXYZ (2020-2022)
        </div>
        <div>• Built scalable web applications from scratch</div>
        <div>• Implemented CI/CD pipelines and DevOps practices</div>
        <div>• Collaborated with cross-functional teams</div>
        <div></div>
        <div>
          <span className="text-yellow-400">Frontend Developer</span> | WebSolutions (2018-2020)
        </div>
        <div>• Developed responsive user interfaces</div>
        <div>• Optimized web performance and accessibility</div>
        <div>• Worked with modern JavaScript frameworks</div>
      </div>
    ),
    education: () => (
      <div className="space-y-2">
        <div>Academic Background:</div>
        <div></div>
        <div>
          <span className="text-blue-400">Bachelor of Science in Computer Science</span>
        </div>
        <div>University of Technology | 2014-2018</div>
        <div>• Graduated Magna Cum Laude (GPA: 3.8/4.0)</div>
        <div>• Relevant Coursework: Data Structures, Algorithms, Software Engineering</div>
        <div></div>
        <div>
          <span className="text-green-400">Certifications:</span>
        </div>
        <div>• AWS Certified Solutions Architect</div>
        <div>• Google Cloud Professional Developer</div>
        <div>• Certified Kubernetes Administrator (CKA)</div>
        <div></div>
        <div>
          <span className="text-yellow-400">Continuous Learning:</span>
        </div>
        <div>• Regular participation in tech conferences and workshops</div>
        <div>• Active contributor to open-source projects</div>
        <div>• Mentor at local coding bootcamps</div>
      </div>
    ),
    github: () => (
      <div className="space-y-2">
        <div>
          🐙 <span className="text-green-400">Opening GitHub profile...</span>
        </div>
        <div>
          <span className="text-blue-400 underline">https://github.com/jasonmyers</span>
        </div>
        <div>Check out my repositories and contributions!</div>
      </div>
    ),
    linkedin: () => (
      <div className="space-y-2">
        <div>
          💼 <span className="text-green-400">Opening LinkedIn profile...</span>
        </div>
        <div>
          <span className="text-blue-400 underline">https://linkedin.com/in/jasonmyers</span>
        </div>
        <div>Let's connect professionally!</div>
      </div>
    ),
    resume: () => (
      <div className="space-y-2">
        <div>
          📄 <span className="text-blue-400">Downloading resume...</span>
        </div>
        <div>Resume downloaded successfully!</div>
        <div>Thank you for your interest in my background.</div>
      </div>
    ),
    clear: () => null,
    cls: () => null,
    exit: () => (
      <div className="space-y-2">
        <div>Goodbye! May your code compile and your bugs be few!</div>
      </div>
    ),
    joke: () => (
      <div className="space-y-2">
        <div>Really? You here for jokes?</div>
      </div>
    ),
  }

  useEffect(() => {
    // Initial welcome message
    setHistory([
      {
        command: "",
        output: (
          <div className="space-y-2">
            <div>Hey I am Satvik</div>
            <div>Type 'help' to see available commands</div>
          </div>
        ),
      },
    ])
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()

    if (trimmedCmd === "clear" || trimmedCmd === "cls") {
      setHistory([])
      return
    }

    const output = commands[trimmedCmd as keyof typeof commands]?.() || (
      <div>Command not found: {cmd}. Type 'help' for available commands.</div>
    )

    setHistory((prev) => [...prev, { command: cmd, output }])
    setCommandHistory((prev) => [...prev, cmd])
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setInput("")
        } else {
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Terminal Header */}
      <div className="border-b border-green-400 p-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-green-400">{">"}</span>
          <span className="text-green-400">satvik@shankar:~</span>
        </div>
        <div className="text-green-400 text-sm">
          {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="p-4 h-[calc(100vh-60px)] overflow-y-auto"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, index) => (
          <div key={index} className="mb-4">
            {item.command && (
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-green-400">$</span>
                <span className="text-white">{item.command}</span>
              </div>
            )}
            <div className="text-gray-300 whitespace-pre-wrap">{item.output}</div>
          </div>
        ))}

        {/* Current Input Line */}
        <div className="flex items-center space-x-2">
          <span className="text-green-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none text-white flex-1 font-mono"
            autoComplete="off"
            spellCheck="false"
          />
          <span className="animate-pulse text-white">|</span>
        </div>
      </div>
    </div>
  )
}
