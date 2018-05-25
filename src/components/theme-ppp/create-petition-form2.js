import React from "react";
import PropTypes from "prop-types";

import About from "./form/instructions/about";
import Statement from "./form/instructions/statement";
import TargetCustom from "./form/instructions/target-custom";
import TargetNational from "./form/instructions/target-national";
import TargetState from "./form/instructions/target-state";
import Title from "./form/instructions/title";
import CustomTargetSelect from "./form/target-select/custom";
import NationalTargetSelect from "./form/target-select/national";
import StateTargetSelect from "./form/target-select/state";

const instructionsByField = {
  title: <Title />,
  statement: <Statement />,
  "target-national": <TargetNational />,
  "target-state": <TargetState />,
  "target-custom": <TargetCustom />,
  about: <About />
};

const CreatePetitionForm = ({ selected, setSelected, nationalOpen, stateOpen, customOpen, instructionStyle, setRef, toggleOpen, nextStep, step }) => {
  const instructions = instructionsByField[selected];

  const national = !nationalOpen ? "" : <NationalTargetSelect />;
  const state = !stateOpen ? "" : <StateTargetSelect />;
  const custom = !customOpen ? "" : <CustomTargetSelect />;

  return (
    <div id="ppp">
      <div className="container-fluid ppp-page-heading">
        <div className="row">
          <div className="col-12 heading-title-wrap">
            <h2>There are millions of MoveOn members waiting for your petition.</h2>
          </div>
        </div>
      </div>

      <form id='petition_form'>
      
        {/* Step 1 */}
        <div className="step1 ppp-step container">

          {/* Petition title */}
          <div className="row ppp-item">
            <div className="col-12">
              <p>Let’s launch your petition! From Local to National, we want to give your voice a platform to help you create progressive change.  </p>
            </div>
            <div className="col-12 ppp-heading">
              <h3>Petition title</h3>
              <div className="ppp-tip">
                Tips
              <span></span>
              </div>
            </div>
            <div className="col-12">
              <p>
                Start with a petition title - successful titles are brief, like a newspaper headline.
            </p>
            </div>
            <div className="col-12">
              <input name="title" id="title_field" className="" type="text" title="Title" placeholder="Your petition title" />
            </div>
          </div>
        </div>

        <div className="signup-modal container">
          <div className="close">
            <span></span>
            <span></span>
          </div>
          <div className="row">
            <div className="col-12">
              <h2>Your petition is important. Let’s make sure you don’t lose progress.</h2>
              <p>Provide your email and Zip code to recover an incomplete petition draft and receive location specific suggestions to help you throughout your petition creation process.</p>
            </div>
            <div className="col-12">
              <input name="email" id="email_field" className="" type="email" title="Email" placeholder="Email" />
            </div>
            <div className="col-12">
              <input name="zip" id="zip_field" className="" type="number" title="Zip" placeholder="Zip" />
            </div>
            <div className="col-12">
              <button type="button" className="xl300 center display-block ppp-btn" value="Preview The Petition" name="submit_button" id="submit_button">
                Next
      </button>
            </div>
            <div className="col-12">
              <a>Already have an account? Click to Log In</a>
            </div>
          </div>
        </div>

        <div className="tip-modal container">
          <div className="close">
            <span></span>
            <span></span>
          </div>
          <div className="row heading">
            <div className="col-12">
              <span></span>
              <h2>Petition Title</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p>Your title should be brief and get people’s attention. Include the change you want to make.</p>
            </div>
            <div className="example col-12">
              <h3>Example #1</h3>
              <p>Mayor Jones: Save Dewey Elementary School.</p>
            </div>
            <div className="example col-12">
              <h3>Example #2</h3>
              <p>Enough is enough. We demand gun control.</p>
            </div>
            <div className="example col-12">
              <h3>Example #3</h3>
              <p>Tell Congress: Restore Net Neutrality before it’s too late!</p>
            </div>
          </div>
        </div>

        <hr />

        {/* Step 2 */}
        <div className="step2 ppp-step container">

          <div className="row ppp-item">
            <div className="col-12 ppp-heading">
              <h3>Petition statement</h3>
              <div className="ppp-tip">
                Tips
                <span></span>
              </div>
            </div>
            <div className="col-12">
              <p>
                In 1-2 sentences, tell us more about what you want your petition to accomplish.
              </p>
            </div>
            <div className="col-12">
              <textarea rows="1" name="statement" id="statement_field" className="" title="Petition statement" placeholder="Petition statement" />
            </div>
          </div>
        </div>

        <div className="tip-modal container">
          <div className="close">
            <span></span>
            <span></span>
          </div>
          <div className="row heading">
            <div className="col-12">
              <span></span>
              <h2>Petition Statement</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p>This is the message that will be delivered to the decision-maker(s). You will get a lot more signers if your message is short and sweet—one or two sentences at the most. The petition statement is NOT the place to make a detailed persuasive argument for your position.</p>
            </div>
            <div className="example col-12">
              <h3>Example #1</h3>
              <p>Stop the proposed cuts in funding for Dewey Elementary School.</p>
            </div>
            <div className="example col-12">
              <h3>Example #2</h3>
              <p>We need common sense gun control now.</p>
            </div>
            <div className="example col-12">
              <h3>Example #3</h3>
              <p>We call on Congress to use the Congressional Review Act to overturn the Federal Communications Commission's repeal of net neutrality</p>
            </div>
          </div>
        </div>

        <hr />

        {/* Step 3 */}
        <div className="step3 ppp-step container">
          <div className="row ppp-item">
            <div className="col-12 ppp-heading">
              <h3>Petition Background</h3>
              <div className="ppp-tip">
                Tips
                <span></span>
              </div>
            </div>
            <div className="col-12">
              <p>
                Briefly describe why this issue is important, and how it’s affected you.
              </p>
            </div>
            <div className="col-12">
              <textarea rows="1" name="background" id="background_field" className="" type="text" title="Petition background" placeholder="Petition background" />
            </div>
          </div>
        </div>

        <div className="tip-modal container">
          <div className="close">
            <span></span>
            <span></span>
          </div>
          <div className="row heading">
            <div className="col-12">
              <span></span>
              <h2>Petition Background</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p>In 1-2 paragraphs, why should people be concerned about this issue? Is there a deadline? Have you been personally affected by the issue?</p>
            </div>
            <div className="example col-12">
              <h3>Example #1</h3>
              <p>My daughter Maria attends Dewey Elementary School, which is about to lose 10 teachers and funding for activities like chess club. Our children's education should be our top priority, and these cuts should be stopped.</p>
            </div>
            <div className="example col-12">
              <h3>Example #2</h3>
              <p>I'm a MoveOn member. I'm a gun owner. I'm a Christian. I'm a Grammy-winning country music producer. And I'm asking us to come together, in the wake of one of the deadliest mass shootings in modern U.S. history, and stand up to the NRA by calling for an end to senseless gun violence.
                </p>
              <p>Parkland. Sutherland Springs. Las Vegas. Sandy Hook. Columbine. Aurora. Virginia Tech. How many more innocent victims must die at the hands of an antiquated and oft-misinterpreted amendment? Enough. It's time to say that thoughts and prayers are no longer enough in the face of gun-related tragedies. We need meaningful action. </p>
            </div>
            <div className="example col-12">
              <h3>Example #3</h3>
              <p>The repeal of net neutrality gives monopolistic internet providers like Verizon, Comcast, and AT&T the power to block, censor, and slow down your favorite sites on the web. 83% of Americans support net neutrality protections.</p>

              <p>Congress, as the oversight body for the FCC, can overturn this massive giveaway to the telecom industry. Since the FCC voted to end net neutrality, 20 senators have already pledged to reverse the FCC's vote, and we can convince others to join us. We need to build on this momentum -- tell your member of Congress to support the resolution to restore net neutrality now.</p>
            </div>
          </div>
        </div>

        <hr />

        {/* Step 4 */}
        <div className="step4 ppp-step container">

          {/* Decision makers */}
          <div className="row ppp-item">
            <div className="col-12 ppp-heading">
              <h3>Decision Makers</h3>
              <div className="ppp-tip">
                Tips
                      <span></span>
              </div>
            </div>
            <div className="col-12">
              <p>
                The Target of your petition is the person or group that has the decision making power to make this change. Let’s find the best target for your petition.
                    </p>
            </div>
            <div className="selection-pills col-12">
              <div className="row">
                <div className="col-6 selection-pill">
                  <div className="pill-inner">
                    U.S. House
                    <div className="close">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
                <div className="col-6 selection-pill">
                  <div className="pill-inner">
                    U.S. Senate
                    <div className="close">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <input name="search" id="search_field" className="" type="text" title="Decision Maker Search" placeholder="Search a specific target" />
            </div>
            <label className="checkbox-wrap col-12">
              <span><b>The White House</b> | The president</span>
              <input name="president" id="president" className="" type="checkbox" title="president" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-wrap col-12">
              <span><b>The U.S.</b> Senate</span>
              <input name="senate" id="senate" className="" type="checkbox" title="senate" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-wrap col-12">
              <span><b>The U.S.</b> House of Representatives</span>
              <input name="representatives" id="representatives" className="" type="checkbox" title="representatives" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-wrap col-12">
              <span><b>Senate</b> of Utah</span>
              <input name="utah-senate" id="utah-senate" className="" type="checkbox" title="utah-senate" />
              <span className="checkmark"></span>
            </label>
            <div className="col-12">
              <div className="add-target">
                Add “Deseret News” as target
                <div className="add"></div>
              </div>
            </div>

          </div>
        </div>

        <div className="tip-modal container">
          <div className="close">
            <span></span>
            <span></span>
          </div>
          <div className="row heading">
            <div className="col-12">
              <span></span>
              <h2>Decision Makers</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p>When deciding who should receive your petition, think about who actually has the power to solve the problem or make the decision you want.</p>

              <p>If there are multiple people who may be able to solve the problem, focus on the person who is most likely to be influenced by public opinion. For instance, an elected official is usually a better target than an unelected judge.</p>

              <p>It’s best if you send your petition to a human being instead of a group. For instance, it’s better to address your petition to the Walmart CEO than Walmart the corporation.</p>
            </div>
            <div className="example col-12">
              <h3>Example #1</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.</p>
            </div>
            <div className="example col-12">
              <h3>Example #2</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.</p>
            </div>
            <div className="example col-12">
              <h3>Example #3</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.</p>
            </div>
          </div>
        </div>

        <hr />

        {/* Step 5 */}
        <div className="step5 ppp-step container">
          <div className="row ppp-item">
            <div className="col-12 ppp-heading">
              <h3>Add a photo or video</h3>
              <div className="ppp-tip">
                Tips
                      <span></span>
              </div>
            </div>
            <div className="col-12">
              <p>
                Petitions with photos or video are more likely to be shared.
                    </p>
            </div>
            <div className="col-12">
              <div className="upload-block">
                <div className="icon"></div>
                <div>upload photo or video</div>
              </div>
            </div>
            <div className="col-12 skip-upload">
              <a>Skip for now ></a>
            </div>
          </div>
        </div>

        <div className="upload-modal container">
          <div className="container">
            <div className="row heading">
              <div className="col-12">
                <span></span>
                <h2>Move & scale your image</h2>
              </div>
            </div>
            <div className="row">
              <div className="upload-media"></div>
            </div>
            <div className="row">
              <div className="col-6">
                <button type="button" className="xl300 center display-block ppp-btn" value="Preview The Petition" name="submit_button" id="submit_button">
                  Cancel
            </button>
              </div>
              <div className="col-6">
                <button type="button" className="xl300 center display-block ppp-btn" value="Preview The Petition" name="submit_button" id="submit_button">
                  Upload Photo
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="tip-modal container">
          <div className="close">
            <span></span>
            <span></span>
          </div>
          <div className="row heading">
            <div className="col-12">
              <span></span>
              <h2>Petition Image</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p>This is the image that will be displayed on the top of your petition. Choose something specific to your petition. We've found that photos of people, animals, or rallies generally do best.</p>

              <p>Obey copyright laws. To be safe, upload your own photo, or choose a free photo from Pixabay or the Creative Commons. </p>

              <p>Bigger images are better. Images that are at least 1200x630px will look the best on Facebook.</p>

              <p>Keep it PG. We will not use any images that show explicit violence or sexual content.
               </p>
            </div>
            <div className="example col-12">
              <div className="example-image">
                <div className="image-wrap"></div>
                <p>Match the topic of your petition</p>
              </div>
            </div>
            <div className="example col-12">
              <div className="example-image">
                <div className="image-wrap"></div>
                <p>Intimiate portraits perform well</p>
              </div>
            </div>
            <div className="example col-12">
              <div className="example-image">
                <div className="image-wrap"></div>
                <p>Keep a clear focus and avoid busy images</p>
              </div>
            </div>
          </div>
        </div>


        {/* Step 6 */}
        <div className="step6 ppp-step container">
          <div className="row ppp-item">
            <div className="col-12 ppp-heading">
              <h3>Review your petition</h3>
              <div className="ppp-tip">
                Edit
                <span></span>
              </div>
            </div>
            <div className="petition-title col-12">
              <h3>We need a real solution for the heroin, fentanyl, oxycontin, and opioid epidemic now.</h3>
            </div>
            <div className="petition-targets col-12">
              <p>To be delivered to <span>The United States House of Representatives</span> and <span>Utah Senate</span>.</p>
            </div>
            <div className="petition-image col-12">
              <div className="image-wrap"></div>
            </div>
            <div className="petition-statement col-12">
              <h4>Petition</h4>
              <p>If the King Amendment is passed, it would nullify vital laws protecting animals, including prohibitions on abusive “puppy mills,” the horse-meat ban in Illinois, and the fur ban in San Francisco.</p>
            </div>
            <div className="petition-background col-12">
              <h4>Background</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent augue ligula, dignissim ut felis sed. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent augue ligula, dignissim ut felis sed. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent augue ligula, dignissim ut felis sed. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent augue ligula, dignissim ut felis sed.</p>
            </div>
          </div>
        </div>

        <div className="signup-modal container">
          <div className="close">
            <span></span>
            <span></span>
          </div>
          <div className="row">
            <div className="col-12">
              <h2>Complete your account to publish this petition.</h2>
              <p>You can edit, manage, and share your petition from your account dashboard.</p>
            </div>
            <div className="col-12">
              <input name="name" id="name_field" className="" type="text" title="name" placeholder="Name" />
            </div>
            <div className="col-12">
              <input name="password" id="password_field" className="" type="text" title="password" placeholder="Password" />
            </div>
            <div className="col-12">
              <input name="confirm-password" id="confirm-password_field" className="" type="text" title="confirm-password" placeholder="Confirm Password" />
            </div>
            <div className="col-12">
              <button type="button" className="xl300 center display-block ppp-btn" value="Preview The Petition" name="submit_button" id="submit_button">
                Publish
              </button>
            </div>
            <div className="col-12">
              <a>Already have an account? Click to Log In</a>
            </div>
          </div>
        </div>


        {/* End of Steps */}
        <hr />

        <button type="button" className="xl300 center display-block ppp-btn" value="Preview The Petition" name="submit_button" id="submit_button">
          Next
        </button>

      </form>
    </div>
  );
};

CreatePetitionForm.propTypes = {
  selected: PropTypes.string,
  setSelected: PropTypes.func,
  nationalOpen: PropTypes.bool,
  stateOpen: PropTypes.bool,
  customOpen: PropTypes.bool,
  instructionStyle: PropTypes.object,
  setRef: PropTypes.func,
  toggleOpen: PropTypes.func,
  nextStep: PropTypes.func,
  step: PropTypes.number
};

export default CreatePetitionForm;

// <div className='container'>
//   <div className='row'>
//     <div className='background-moveon-light-gray span6 start-form'>
//       <form id='petition_form'>
//         <input value='' name='targets' id='targets_json' type='hidden' />
//         <input value='' name='skin' type='hidden' />
//         <input value='' name='source' type='hidden' />
//         <input value='' name='cloned_from_id' type='hidden' />
//         <input value='' name='solicit_id' type='hidden' />
//         <fieldset id='start'>
//           <span className='circle-number'>1</span>
//           <span className='lanky-header moveon-dark-blue'>
//             {' '}
//             Start your petition PPP!
//           </span>
//           <div className='text wrapper big' id='text_name_wrapper'>
//             <input
//               name='name'
//               id='name_field'
//               className='span6'
//               type='text'
//               title='Your Petition Title'
//               placeholder='Petition title'
//               onClick={setSelected('title')}
//               ref={setRef('titleInput')}
//             />
//           </div>
//           <div className='text wrapper' id='text_statement_wrapper'>
//             <textarea
//               className='span6 '
//               name='text_statement'
//               placeholder='What&rsquo;s the text of your petition? (Try to keep it to 1-2 sentences.)'
//               id='text_statement_field'
//               title='Text of your Petition'
//               onClick={setSelected('statement')}
//               ref={setRef('statementInput')}
//             />
//           </div>
//         </fieldset>
//         <div id='target_wrapper' className='' title='Choosing a Target'>
//           <fieldset id='target' className=''>
//             <span className='circle-number'>2</span>
//             <span className='lanky-header moveon-dark-blue'>
//               Who&#39;s the target of your petition?
//             </span>
//             <div
//               className='checkbox wrapper'
//               id='national_group_wrapper'
//               title='Targeting the White House or Congress'
//               onClick={setSelected('target-national')}
//             >
//               <label htmlFor='national_group' id='national_group_label'>
//                 <input
//                   name='national_group_checkbox'
//                   id='national_group'
//                   type='checkbox'
//                   className='reveal_more_options'
//                   onClick={toggleOpen('nationalOpen')}
//                   ref={setRef('nationalInput')}
//                 />{' '}
//                 The White House or Congress
//               </label>
//               {national}
//             </div>
//             <div
//               className='checkbox wrapper'
//               id='state_group_wrapper'
//               title='Targeting Your Governor or State Legislature'
//               onClick={setSelected('target-state')}
//             >
//               <label htmlFor='state_group' id='state_group_label'>
//                 <input
//                   name='state_group'
//                   id='state_group'
//                   type='checkbox'
//                   className='reveal_more_options'
//                   onClick={toggleOpen('stateOpen')}
//                   ref={setRef('stateInput')}
//                 />{' '}
//                 Your governor or state legislature
//               </label>
//               {state}
//             </div>
//             <div
//               className='checkbox wrapper'
//               id='checkbox_custom_group_wrapper'
//               onClick={setSelected('target-custom')}
//             >
//               <label
//                 htmlFor='custom_group'
//                 id='checkbox_custom_group_label'
//               >
//                 <input
//                   name='checkbox_custom_group'
//                   id='custom_group'
//                   type='checkbox'
//                   className='reveal_more_options'
//                   onClick={toggleOpen('customOpen')}
//                   ref={setRef('customInput')}
//                 />{' '}
//                 Someone else (like a local official or corporate CEO)
//               </label>
//               {custom}
//             </div>
//           </fieldset>
//         </div>
//         <fieldset id='statement'>
//           <span className='circle-number'>3</span>
//           <span className='lanky-header moveon-dark-blue'>
//             Why are you starting this petition?
//           </span>
//           <div className='text wrapper' id='text_about_wrapper'>
//             <textarea
//               className='span6'
//               name='text_about'
//               id='text_about_field'
//               placeholder='What&rsquo;s your petition about? Have you been personally affected by the issue?'
//               title='Petition Background'
//               onClick={setSelected('about')}
//               ref={setRef('aboutInput')}
//             />
//           </div>
//         </fieldset>
//         <button
//           type='button'
//           className='xl300 center display-block background-moveon-bright-red'
//           value='Preview The Petition'
//           name='submit_button'
//           id='submit_button'
//         >
//           Preview Petition <span className='triangle'>&#9654;</span>
//         </button>
//       </form>
//     </div>
//     <div className='span5 hidden-phone' style={instructionStyle}>
//       <span
//         className='icon-arrow-red-left hidden-phone'
//         style={{ position: 'relative', top: 88 }}
//       />
//       <div className='hint'>{instructions}</div>
//     </div>
//   </div>
// </div>
