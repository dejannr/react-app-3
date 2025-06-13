// src/pages/ChatPage.jsx
import React, { useState, useEffect } from 'react'
import { useFetch } from '../hooks/useFetch.jsx'
import { usePost }  from '../hooks/usePost.jsx'
import ChatContainer from '../components/chat/ChatContainer.jsx'
import ChatHeader    from '../components/chat/ChatHeader.jsx'
import ChatWindow    from '../components/chat/ChatWindow.jsx'
import ChatBubble    from '../components/chat/ChatBubble.jsx'
import ChatInput     from '../components/chat/ChatInput.jsx'
import attachIcon from '../img/attach.png'
import sendIcon from '../img/send.png'
import logo from '../img/logo.png'
import '../styles/resetstyle.css'

export default function ChatPage() {
  // fetch user
  const { data: user, loading: uLoading, error: uError } = useFetch('/get_username', {}, true)
  // chat post
  const { data: bot, loading: bLoading, error: bError, postData } = usePost('/chat')

  const [msgs, setMsgs] = useState([])

  // append bot reply
  useEffect(() => {
    if (bot?.reply) {
      setMsgs(prev => [...prev, { from: 'bot', text: bot.reply }])
    }
  }, [bot])

  const handleSend = (text) => {
    setMsgs(prev => [...prev, { from: 'user', text }])
    postData({ message: text })
  }

  if (uLoading) return <p>Checking login…</p>
  if (uError || !user?.login) {
    return <p style={{ color: 'crimson' }}>Please log in to Odoo first.</p>
  }

  const header = <ChatHeader title={`Chat as ${user.name}`} />

  // return (
  //   <ChatContainer header={header}>
  //     <ChatWindow
  //       messages={msgs.map((m,i) => (
  //         <ChatBubble key={i} from={m.from}>{m.text}</ChatBubble>
  //       ))}
  //     />
  //     <ChatInput onSend={handleSend} disabled={bLoading} />
  //     {bError && <p style={{ color: 'red', textAlign: 'center' }}>Error: {bError.message}</p>}
  //   </ChatContainer>
  // )
  return (
      <>
        <div className="chat-wrapper">
          <div className="chat-sidepanel">
            <div className="logo">
              <img src={logo} alt=""/>
              {/*<h2>Lupa Direct</h2>*/}
            </div>
            <h2 class="heading">Chats</h2>
            <div className="bubbles">
              <div className="bubble active">
                <h3>2024_42 Disruption log May 22/May 23</h3>
              </div>
              <div className="bubble">
                <h3>2024_42 Disruption log May 24/May 25</h3>
              </div>
              <div className="bubble">
                <h3>2024_42 Disruption log May 26/May 27</h3>
              </div>
              <div className="bubble">
                <h3>2024_42 Disruption log May 28/May 29</h3>
              </div>
            </div>
          </div>
          <div className="chat-main">
            <div className="window">
              <div className="content">
                <div className="messages">
                  <div className="bubble user">
                    <p>Are you ready to rock and roll?</p></div>
                  <div className="bubble bot">
                    <p>Absolutely! Let’s rock and roll—what’s on the agenda today?</p>
                  </div>
                  <div className="bubble user">
                    <p>Tell me something about excavation.</p>
                  </div>
                  <div className="bubble bot">
                     <h1>Excavation</h1>
                      <p>
                        Excavation is the process of removing earth, rock or other materials from a site
                        to form a cavity, hole or foundation. It’s fundamental in fields ranging from
                        construction and mining to archaeology.
                      </p>

                      <h2>1. Purposes of Excavation</h2>
                      <ul>
                        <li><strong>Construction:</strong> Creating foundations, basements, trenches for utilities, roadbeds and tunnels.</li>
                        <li><strong>Mining &amp; Quarrying:</strong> Accessing mineral deposits by open-pit or underground methods.</li>
                        <li><strong>Archaeology:</strong> Carefully uncovering artifacts and features to study past human activity.</li>
                      </ul>

                      <h2>2. Methods &amp; Equipment</h2>
                      <ul>
                        <li><strong>Manual Excavation:</strong> Hand tools like shovels, picks and trowels—common in small-scale or sensitive archaeological digs.</li>
                        <li><strong>Mechanical Excavation:</strong> Hydraulic excavators, backhoes, bulldozers, trenchers and tunnel-boring machines for larger projects.</li>
                        <li><strong>Specialized Techniques:</strong>
                          <ul>
                            <li><em>Dewatering</em> to remove groundwater from trenches.</li>
                            <li><em>Blasting</em> in rock to break it into manageable pieces.</li>
                          </ul>
                        </li>
                      </ul>

                      <h2>3. Typical Excavation Workflow</h2>
                      <ol>
                        <li><strong>Site Investigation:</strong> Soil surveys and testing to determine ground conditions.</li>
                        <li><strong>Planning &amp; Permitting:</strong> Establishing cut/fill volumes, access points, environmental safeguards, and obtaining regulatory approvals.</li>
                        <li><strong>Pre-Excavation Safety:</strong> Installing shoring or benching to prevent cave-ins; setting up erosion and sediment controls.</li>
                        <li><strong>Excavation &amp; Hauling:</strong> Removing material in lifts (layers), loading it into trucks or conveyors for disposal or reuse.</li>
                        <li><strong>Inspection &amp; Backfill:</strong> Verifying depths, grades and dimensions; backfilling around structures once installations are complete.</li>
                      </ol>

                      <h2>4. Safety Considerations</h2>
                      <ul>
                        <li><strong>Protective Systems:</strong> Sloping (cutting back walls at an angle), benching (stepped levels) or shoring (pneumatic, hydraulic or timber supports) to prevent trench collapse.</li>
                        <li><strong>Utilities Mark-Out:</strong> Locating and avoiding underground cables, pipes or sewers.</li>
                        <li><strong>Personal Protective Equipment (PPE):</strong> Helmets, steel-toe boots, high-visibility clothing and respiratory protection when needed.</li>
                      </ul>

                      <h2>5. Environmental &amp; Regulatory Aspects</h2>
                      <ul>
                        <li><strong>Erosion Control:</strong> Silt fences, hay bales or stabilizing mats to keep sediment on-site.</li>
                        <li><strong>Spoil Management:</strong> Planning for storage or reuse of excavated material.</li>
                        <li><strong>Permitting:</strong> Wetland or heritage-site clearances, noise and dust regulations.</li>
                      </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="input">
              <div className="content">
                <div className="attach">
                <img src={attachIcon} alt=""/>
                </div>
                <input type="text" placeholder="Type here..."/>
                <div className="send">
                  <img src={sendIcon} alt=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}
