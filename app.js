const STORAGE_KEY = 'ed825IRBReadinessCenter.v1';

const statusMessages = {
  planning: {
    cls: 'wait',
    title: 'Planning / paper review / working drafts',
    text: 'You may inventory and develop IRB materials as working drafts while paper review is underway. Keep every draft aligned with the current Chapters 1–3. Do not make an official IRB submission or begin research activities based on preparation work alone.'
  },
  revision: {
    cls: 'revision',
    title: 'Paper Revision Track',
    text: 'Continue revising Chapters 1–3 and addressing faculty, committee, or RPC feedback. You may keep IRB materials organized as working drafts, but do not submit the official PG IRB application until you are approved or explicitly cleared to proceed.'
  },
  cleared: {
    cls: 'ready',
    title: 'Approved / cleared for IRB packet preparation',
    text: 'You may move into full packet-readiness work. Confirm the proposed pathway, complete every applicable document, verify site permission and instrument documentation, and make sure the packet describes the same study as the approved/current Chapters 1–3.'
  },
  mock: {
    cls: 'ready',
    title: 'Preparing the mock IRB packet',
    text: 'Prepare the package as if it were ready for administrative review. Do not submit outlines, placeholders, incomplete forms, or statements that materials will be completed later. Faculty review is not official IRB approval.'
  },
  official: {
    cls: 'ready',
    title: 'Preparing official PG IRB submission',
    text: 'Use this status only when you have authorization to submit. Address mock packet feedback, confirm all documents are current and aligned, complete the PG IRB Application Form carefully, and save the submission confirmation.'
  },
  submitted: {
    cls: 'wait',
    title: 'IRB submitted — waiting for review',
    text: 'Submission confirmation is not approval. Monitor Purdue Global email, RPC communication, and IRB feedback. Do not recruit, consent, access research records, or collect data while waiting.'
  },
  revisions: {
    cls: 'revision',
    title: 'IRB revisions or additional information requested',
    text: 'Work with your RPC/faculty guidance to address requested changes. Re-check alignment across every affected document. Do not begin research activities unless and until official approval is received.'
  },
  approved: {
    cls: 'approved',
    title: 'Official IRB approval received',
    text: 'Follow the approved protocol exactly and use only approved materials and procedures. If a change is needed, contact your faculty member or RPC before making it because additional IRB review may be required.'
  }
};

const pathwayInfo = {
  none: null,
  hrd: {
    label: 'Human Research Determination',
    protocol: 'IRB-503b — Human Research Determination Protocol',
    participant: 'An IRB consent form or research information sheet is generally not required. Include any notices, scripts, surveys, invitations, or other materials provided to individuals when applicable.',
    note: 'This is a proposed pathway only. The PG IRB makes the official determination.'
  },
  exempt: {
    label: 'Exempt Research',
    protocol: 'IRB-503c — Exempt Study Protocol',
    participant: 'IRB-502b — Research Participant Information Sheet when participants are contacted.',
    note: 'Exempt research still requires IRB submission and a determination before research activity begins.'
  },
  expedited: {
    label: 'Expedited Research',
    protocol: 'IRB-503a — Expedited Research Protocol',
    participant: 'IRB-502a — Research Participant Informed Consent Form.',
    note: 'The proposed expedited pathway does not mean approval has been granted. The PG IRB makes the official determination.'
  }
};

const packetGroups = [
  {
    id: 'core',
    title: 'Core packet materials',
    note: 'Required or applicable materials for the mock packet review.',
    items: [
      'I am using one current protocol form that matches my proposed pathway.',
      'Both required ED825 CITI certificates are current: Group 2 Social/Humanistic/Behavioral Research (Basic Course) and Social and Behavioral Responsible Conduct of Research (SBR).',
      'My site permission is signed and approved.',
      'I included recruitment materials when recruitment will occur.',
      'I included every research instrument/data-collection tool that will actually be used.',
      'I included instrument-use permission/licensing/public-use documentation when applicable.',
      'For researcher-developed instruments, I included applicable review/validation/development documentation.',
      'I included the participant-facing material required for my proposed pathway when applicable.',
      'I included additional study-specific documents when applicable.'
    ]
  },
  {
    id: 'protocol',
    title: 'Protocol completion',
    note: 'The protocol should describe the current study, not an earlier version.',
    items: [
      'Every applicable protocol question is answered; N/A is used appropriately when permitted.',
      'Required Purdue standard language remains unchanged where the current template directs it to remain.',
      'Red instructional/example text has been removed or replaced as directed by the template.',
      'No bracketed placeholders, “Click or tap here” fields, or unfinished template instructions remain.',
      'Participant population, recruitment, procedures, data collection, risks, protections, and data security are study-specific rather than generic.',
      'The protocol title and study details match the current paper and supporting materials.'
    ]
  },
  {
    id: 'presentation',
    title: 'Administrative review presentation',
    note: 'Make it easy for faculty/RPC reviewers to locate and verify each required item.',
    items: [
      'Each file opens correctly and is clearly named.',
      'Documents are complete rather than outlines, summaries, or placeholders.',
      'The packet is organized so required materials are easy to locate.',
      'I have addressed prior faculty, committee, RPC, or checkpoint feedback that affects the packet.',
      'Remaining questions are limited and clearly identified for faculty/RPC clarification.'
    ]
  }
];

const siteGroups = [
  {
    id: 'siteBasics',
    title: 'Signed permission basics',
    items: [
      'The permission identifies the correct organization/site.',
      'The permission is signed and approved by the site representative authorized to grant/oversee access, when this can be determined.',
      'The permission reflects the current study—not an earlier version.'
    ]
  },
  {
    id: 'siteMatch',
    title: 'Direct match to the current study',
    items: [
      'Study purpose/title are materially consistent with the current protocol.',
      'Participant or data-source population matches.',
      'Participant age/eligibility group matches when applicable.',
      'Recruitment population and recruitment method match.',
      'Who contacts or provides access to participants matches.',
      'Researcher access to employees, students, clients, patients, records, or organizational data matches.',
      'Surveys, interviews, focus groups, observations, or other procedures conducted at/through the site match.',
      'Audio/video recording is covered when applicable.',
      'Instruments and data-collection activities conducted at/through the site match.',
      'Use of organizational records/data is covered when applicable.'
    ]
  }
];

const participantGroups = [
  {
    id: 'recruitment',
    title: 'Recruitment & voluntary participation',
    items: [
      'The recruited population is appropriate for the research question rather than based only on convenience or access.',
      'The protocol clearly explains how potential participants will be identified and accessed.',
      'Recruitment materials and the protocol agree on who recruits, how recruitment occurs, and where it occurs.',
      'Recruitment protects privacy and avoids coercion or undue influence.',
      'If employees are involved, the recruitment process avoids using a supervisor or person with employment authority to pressure participation.',
      'Participation is clearly voluntary in participant-facing materials.'
    ]
  },
  {
    id: 'participantFacing',
    title: 'Consent / information sheet / participant-facing materials',
    items: [
      'I am using the participant-facing material that matches my proposed pathway.',
      'Study title and purpose match the protocol.',
      'Participant eligibility description matches the protocol.',
      'What participants will do is accurate, chronological, and consistent with the protocol.',
      'Time commitment is stated and matches the protocol and actual procedures.',
      'Risks/discomforts and protections are accurate and not minimized.',
      'Benefits are not overstated and compensation is not described as a research benefit.',
      'Voluntary participation and withdrawal rights are clear.',
      'Privacy/confidentiality language matches the actual study procedures.',
      'Researcher contact information and PG IRB contact information are complete when required.'
    ]
  },
  {
    id: 'privacy',
    title: 'Privacy, confidentiality & identifiability',
    items: [
      'I distinguish privacy (the participant/person before and during collection) from confidentiality (management/protection of data after collection).',
      'I use “anonymous” only when the researcher cannot readily connect responses/data to an individual.',
      'If identifiers are collected, the protocol explains what they are and how they are protected.',
      'Interview/focus-group settings protect participant privacy as much as reasonably possible.',
      'If focus groups or other group procedures are used, participant-facing materials address limits on the researcher’s ability to guarantee what other participants may disclose.',
      'Audio/video recordings are treated as identifiable when applicable and their storage/access/destruction are addressed.'
    ]
  },
  {
    id: 'security',
    title: 'Data security, retention & destruction',
    items: [
      'The protocol identifies where study data will be stored.',
      'The protocol identifies who will have access to study data.',
      'Password protection, encryption, or other security controls are described as applicable.',
      'Identifiers/code keys are separated or protected as described in the protocol when applicable.',
      'Data transmission/transfer procedures are addressed when applicable.',
      'The protocol explains whether identifiable data will be retained, coded, or de-identified at the end of the study.',
      'The retention period is stated consistently across applicable materials and is at least three years after the research is discontinued unless another requirement applies.',
      'The destruction method is described for identifiable data/recordings when applicable.'
    ]
  },
  {
    id: 'platforms',
    title: 'Platform settings verification',
    items: [
      'The protocol names the actual survey, meeting, recording, transcription, storage, or other platforms that will be used when applicable.',
      'I have checked whether email addresses or names are collected by the platform.',
      'I have checked whether IP addresses or other identifiers are collected or visible.',
      'I have checked sign-in/account requirements that may affect anonymity or privacy.',
      'I have checked recording/transcription settings and who can access recordings/transcripts.',
      'I have checked sharing/export/access permissions for study data.',
      'The protocol and participant-facing materials describe the settings I will actually use—not merely what the platform can theoretically do.'
    ]
  }
];

const preflightGroups = [
  {
    id: 'preflightForms',
    title: 'Forms & templates',
    items: [
      'Current form/template version used',
      'Correct protocol for proposed pathway',
      'No red instructions or bracketed placeholders',
      'No “Click or tap here” fields left behind'
    ]
  },
  {
    id: 'preflightPeople',
    title: 'Participants & recruitment',
    items: [
      'Adult participant population is clearly defined for the EdD study',
      'Age range/eligibility criteria are clear',
      'Sample size is stated and justified',
      'Recruitment method protects privacy and voluntariness'
    ]
  },
  {
    id: 'preflightMatch',
    title: 'Cross-document match',
    items: [
      'Study title and purpose match',
      'Participants/data sources match',
      'Procedures and instruments match',
      'Time, risks, incentives, confidentiality, and data storage match'
    ]
  },
  {
    id: 'preflightRisks',
    title: 'Risks & protections',
    items: [
      'Breach of confidentiality risk is addressed',
      'Sensitive/workplace/reputation risks are addressed when applicable',
      'Risk mitigation is specific to each identified risk',
      'Withdrawal/skip-question protections are clear when applicable'
    ]
  },
  {
    id: 'preflightAttachments',
    title: 'Attachments',
    items: [
      'All recruitment materials attached when applicable',
      'All instruments/data-collection tools attached',
      'Required instrument permission/validation documentation attached',
      'Site permission and participant-facing materials attached as applicable'
    ]
  },
  {
    id: 'preflightFinal',
    title: 'Final administrative check',
    items: [
      'Packet matches current Chapters 1–3',
      'Prior review feedback affecting the packet is addressed',
      'Files are clearly named and open correctly',
      'I have not begun recruitment, consent, records access, or data collection'
    ]
  }
];

const alignmentRows = [
  {id:'title', label:'Study title', cols:['paper','protocol','site','recruitment','participant','instrument','security']},
  {id:'purpose', label:'Purpose / study focus', cols:['paper','protocol','site','recruitment','participant']},
  {id:'rq', label:'Research question(s)', cols:['paper','protocol','instrument','security']},
  {id:'participants', label:'Participants / data sources', cols:['paper','protocol','site','recruitment','participant','instrument']},
  {id:'eligibility', label:'Age / inclusion / exclusion', cols:['paper','protocol','site','recruitment','participant']},
  {id:'recruit', label:'Recruitment process', cols:['paper','protocol','site','recruitment','participant']},
  {id:'procedures', label:'Procedures / data collection', cols:['paper','protocol','site','recruitment','participant','instrument']},
  {id:'time', label:'Participant time', cols:['protocol','recruitment','participant','instrument']},
  {id:'recording', label:'Recording / transcription', cols:['paper','protocol','site','recruitment','participant','instrument','security']},
  {id:'incentives', label:'Incentives / compensation', cols:['protocol','recruitment','participant']},
  {id:'privacy', label:'Privacy / confidentiality', cols:['paper','protocol','recruitment','participant','instrument','security']},
  {id:'storage', label:'Data storage / access', cols:['paper','protocol','participant','security']},
  {id:'retention', label:'Retention / destruction', cols:['paper','protocol','participant','security']},
  {id:'analysis', label:'Data analysis', cols:['paper','protocol','instrument']}
];

const matrixCols = [
  ['paper','Chapters 1–3'],
  ['protocol','Protocol'],
  ['site','Site Permission'],
  ['recruitment','Recruitment'],
  ['participant','Consent / Info'],
  ['instrument','Instrument'],
  ['security','Data Security']
];

const resources = [
  [
    'Video',
    'One Mismatch Can Stall Your IRB Submission',
    'See how inconsistencies across your paper, protocol, site permission, recruitment materials, instruments, and participant-facing documents can delay IRB review.',
    'https://youtu.be/dSbxgogSHoI'
  ],
  [
    'Video',
    'Mastering Your IRB Packet Submission',
    'Review the major components of a complete IRB packet and the final checks to complete before submission.',
    'https://youtu.be/vScy9crP-bo'
  ],
  [
    'Video Series',
    'Avoiding Common IRB Submission Pitfalls',
    'Review common IRB preparation problems and practical ways to identify potential issues before submitting your packet.',
    'https://youtube.com/playlist?list=PLJqJo3qfhLNkqyZLlKCh1i33o-nOYZRPx&si=5Bfszf4DJ7_Ik7EL'
  ],
  [
    'Optional AI Self-Check',
    'IRB Packet Self-Check Assistant',
    'Use this optional tool to review your developing IRB packet for possible missing materials, inconsistencies, alignment concerns, and areas to verify with your faculty member or RPC. AI may make mistakes or overlook information. This tool does not provide IRB approval, determine your official pathway, authorize submission, or replace faculty/RPC or Purdue Global IRB review.',
    'https://gemini.google.com/gem/1BFmvthm3HxBj3qJ5PzdMoKgP6TSlAaDP?usp=sharing'
  ]
];

function defaultState(){
  return {
    status:'planning',
    pathway:'none',
    checks:{},
    matrix:{},
    times:{
      consent:0,
      survey:0,
      interview:0,
      followup:0,
      other:0
    }
  };
}

function loadState(){
  try {
    return {
      ...defaultState(),
      ...(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {})
    };
  }
  catch {
    return defaultState();
  }
}

let state = loadState();

function save(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateAllProgress();
}

function checkKey(group,id){
  return `${group}.${id}`;
}

function isChecked(group,id){
  return !!state.checks[checkKey(group,id)];
}

function setChecked(group,id,value){
  state.checks[checkKey(group,id)] = value;
  save();
}

function renderStatus(){
  const select = document.getElementById('student-status');
  select.value = state.status;

  const s = statusMessages[state.status];
  const box = document.getElementById('status-message');

  box.className = `status-message ${s.cls}`;
  box.innerHTML = `<h3>${s.title}</h3><p>${s.text}</p>`;
}

function renderPathway(){
  const sel = document.getElementById('pathway-select');
  sel.value = state.pathway;

  const info = pathwayInfo[state.pathway];
  const card = document.getElementById('pathway-card');

  if(!info){
    card.className = 'pathway-card neutral';
    card.innerHTML = '<strong>Select your proposed pathway above.</strong> The site will show the matching protocol and participant-facing material. This selection is for preparation only.';
    return;
  }

  card.className = 'pathway-card';

  card.innerHTML = `
    <div class="pathway-main">
      <span class="tag">PROPOSED PATHWAY</span>
      <h3>${info.label}</h3>
      <p><strong>Protocol:</strong> ${info.protocol}</p>
      <p>${info.note}</p>
    </div>

    <div>
      <span class="tag">PARTICIPANT-FACING REQUIREMENT</span>
      <h3>What to prepare</h3>
      <p>${info.participant}</p>
    </div>
  `;
}

function groupHtml(group, groupName='packet'){
  return `
    <article class="check-group">
      <h3>${group.title}</h3>
      ${group.note ? `<p class="group-note">${group.note}</p>` : ''}

      ${group.items.map((item,i)=>`
        <label class="check-item">
          <input
            type="checkbox"
            data-check-group="${groupName}.${group.id}"
            data-check-index="${i}"
            ${isChecked(`${groupName}.${group.id}`,i) ? 'checked' : ''}
          >
          <span>${item}</span>
        </label>
      `).join('')}

      <div
        class="check-progress"
        data-progress-group="${groupName}.${group.id}"
        data-progress-total="${group.items.length}">
      </div>
    </article>
  `;
}

function renderPacket(){
  document.getElementById('packet-checks').innerHTML =
    packetGroups.map(g=>groupHtml(g,'packet')).join('');
}

function renderSite(){
  document.getElementById('site-checks').innerHTML =
    siteGroups.map(g=>groupHtml(g,'site')).join('');
}

function renderParticipantGroups(){
  document.getElementById('participant-groups').innerHTML =
    participantGroups.map(g=>`
      <details open>
        <summary>${g.title}</summary>

        <div class="accordion-content">
          ${g.items.map((item,i)=>`
            <label class="check-item">
              <input
                type="checkbox"
                data-check-group="participant.${g.id}"
                data-check-index="${i}"
                ${isChecked(`participant.${g.id}`,i) ? 'checked' : ''}
              >
              <span>${item}</span>
            </label>
          `).join('')}

          <div
            class="check-progress"
            data-progress-group="participant.${g.id}"
            data-progress-total="${g.items.length}">
          </div>
        </div>
      </details>
    `).join('');
}

function renderPreflight(){
  document.getElementById('preflight-checks').innerHTML =
    preflightGroups.map(g=>`
      <article class="preflight-card">
        <h3>${g.title}</h3>

        ${g.items.map((item,i)=>`
          <label class="check-item">
            <input
              type="checkbox"
              data-check-group="preflight.${g.id}"
              data-check-index="${i}"
              ${isChecked(`preflight.${g.id}`,i) ? 'checked' : ''}
            >
            <span>${item}</span>
          </label>
        `).join('')}

        <div
          class="check-progress"
          data-progress-group="preflight.${g.id}"
          data-progress-total="${g.items.length}">
        </div>
      </article>
    `).join('');
}

function renderMatrix(){
  const head = matrixCols
    .map(([,label])=>`<th>${label}</th>`)
    .join('');

  const rows = alignmentRows.map(row=>{
    const cells = matrixCols.map(([col])=>{
      if(!row.cols.includes(col)){
        return '<td><span class="na">N/A</span></td>';
      }

      const key = `${row.id}.${col}`;

      return `
        <td>
          <input
            type="checkbox"
            aria-label="${row.label} aligned in ${col}"
            data-matrix="${key}"
            ${state.matrix[key] ? 'checked' : ''}
          >
        </td>
      `;
    }).join('');

    return `<tr><td>${row.label}</td>${cells}</tr>`;
  }).join('');

  document.getElementById('alignment-matrix').innerHTML = `
    <table class="matrix">
      <thead>
        <tr>
          <th>Study element</th>
          ${head}
        </tr>
      </thead>

      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

function renderResources(){
  document.getElementById('resource-grid').innerHTML =
    resources.map(([type,title,desc,url])=>`
      <article class="resource-card">
        <span>${type}</span>
        <h3>${title}</h3>
        <p>${desc}</p>
        <a href="${url}" target="_blank" rel="noopener">
          Open resource →
        </a>
      </article>
    `).join('');
}

function wireChecks(){
  document.querySelectorAll('[data-check-group]').forEach(cb=>
    cb.addEventListener('change',e=>{
      setChecked(
        e.target.dataset.checkGroup,
        e.target.dataset.checkIndex,
        e.target.checked
      );
    })
  );

  document.querySelectorAll('[data-matrix]').forEach(cb=>
    cb.addEventListener('change',e=>{
      state.matrix[e.target.dataset.matrix] = e.target.checked;
      save();
    })
  );
}

function allCheckGroups(){
  const groups = [];

  packetGroups.forEach(g=>groups.push(['packet',g]));
  siteGroups.forEach(g=>groups.push(['site',g]));
  participantGroups.forEach(g=>groups.push(['participant',g]));
  preflightGroups.forEach(g=>groups.push(['preflight',g]));

  return groups;
}

function groupCount(prefix,g){
  const done = g.items.filter((_,i)=>
    isChecked(`${prefix}.${g.id}`,i)
  ).length;

  return {
    done,
    total:g.items.length
  };
}

function updateGroupProgress(){
  document.querySelectorAll('[data-progress-group]').forEach(el=>{
    const group = el.dataset.progressGroup;
    const total = Number(el.dataset.progressTotal) || 0;

    let done = 0;

    for(let i=0;i<total;i++){
      if(isChecked(group,i)){
        done++;
      }
    }

    el.textContent = `${done} of ${total} checked`;
  });

  const packetTotal = packetGroups.reduce(
    (n,g)=>n+g.items.length,
    0
  );

  const packetDone = packetGroups.reduce(
    (n,g)=>n+groupCount('packet',g).done,
    0
  );

  document.getElementById('packet-count').textContent =
    `${packetDone} of ${packetTotal} checked`;

  document.getElementById('packet-bar').style.width =
    `${packetTotal ? packetDone/packetTotal*100 : 0}%`;

  const siteTotal = siteGroups.reduce(
    (n,g)=>n+g.items.length,
    0
  );

  const siteDone = siteGroups.reduce(
    (n,g)=>n+groupCount('site',g).done,
    0
  );

  document.getElementById('site-count').textContent =
    `${siteDone} of ${siteTotal} checked`;

  document.getElementById('site-bar').style.width =
    `${siteTotal ? siteDone/siteTotal*100 : 0}%`;
}

function updateAlignment(){
  const applicable = alignmentRows.reduce(
    (n,row)=>n+row.cols.length,
    0
  );

  const done = Object.values(state.matrix)
    .filter(Boolean)
    .length;

  const missing = Math.max(0,applicable-done);

  const el = document.getElementById('alignment-result');

  if(done===0){
    el.innerHTML =
      '<strong>Alignment matrix not started.</strong> Check a box only after you have compared that study element across the indicated document.';
  }
  else if(missing===0){
    el.innerHTML =
      '<strong>All matrix comparisons are marked reviewed.</strong> This means you completed the self-check—not that the packet is officially aligned or approved. Student verification and faculty/RPC/IRB review are still required.';
  }
  else {
    el.innerHTML =
      `<strong>${done} of ${applicable} applicable comparisons marked reviewed.</strong> ${missing} comparison${missing===1?' remains':'s remain'} to check.`;
  }
}

function updateTime(){
  const ids = [
    'consent',
    'survey',
    'interview',
    'followup',
    'other'
  ];

  let total = 0;

  ids.forEach(id=>{
    const input = document.getElementById(`time-${id}`);

    let value = Number(input.value);

    if(!Number.isFinite(value) || value<0){
      value = 0;
    }

    value = Math.min(10000,Math.round(value));

    input.value = value;
    state.times[id] = value;
    total += value;
  });

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state)
  );

  const result = document.getElementById('time-result');

  if(total<60){
    result.innerHTML =
      `<strong>${total} minute${total===1?'':'s'}</strong><span>Estimated participant time</span>`;
  }
  else {
    const h = Math.floor(total/60);
    const m = total%60;

    result.innerHTML =
      `<strong>${h} hr${h===1?'':'s'}${m?` ${m} min`:''}</strong><span>Estimated participant time (${total} minutes)</span>`;
  }
}

function updateSummary(){
  const cards = [];

  const categoryMap = [
    ['Packet inventory',packetGroups,'packet'],
    ['Site permission',siteGroups,'site'],
    ['Participant protections',participantGroups,'participant'],
    ['Pre-submission scan',preflightGroups,'preflight']
  ];

  categoryMap.forEach(([label,arr,prefix])=>{
    const total = arr.reduce(
      (n,g)=>n+g.items.length,
      0
    );

    const done = arr.reduce(
      (n,g)=>n+groupCount(prefix,g).done,
      0
    );

    const remaining = total-done;

    cards.push(`
      <article class="summary-card ${remaining===0?'complete':'attention'}">
        <span>${label}</span>
        <strong>${done}/${total}</strong>
        <p>
          ${
            remaining===0
              ? 'All self-check items marked reviewed.'
              : `${remaining} item${remaining===1?'':'s'} still unmarked.`
          }
        </p>
      </article>
    `);
  });

  const matrixTotal = alignmentRows.reduce(
    (n,row)=>n+row.cols.length,
    0
  );

  const matrixDone = Object.values(state.matrix)
    .filter(Boolean)
    .length;

  cards.push(`
    <article class="summary-card ${matrixDone===matrixTotal?'complete':'attention'}">
      <span>Alignment matrix</span>
      <strong>${matrixDone}/${matrixTotal}</strong>
      <p>
        ${
          matrixTotal-matrixDone===0
            ? 'All applicable comparisons marked reviewed.'
            : `${matrixTotal-matrixDone} comparison${matrixTotal-matrixDone===1?'':'s'} still unmarked.`
        }
      </p>
    </article>
  `);

  const p = pathwayInfo[state.pathway];

  cards.push(`
    <article class="summary-card ${p?'complete':'attention'}">
      <span>Proposed pathway</span>
      <strong>${p?'Selected':'Not set'}</strong>
      <p>${p?p.label:'Select the proposed pathway you are preparing.'}</p>
    </article>
  `);

  const status = statusMessages[state.status];

  cards.push(`
    <article class="summary-card complete">
      <span>Current status</span>
      <strong>${state.status==='approved'?'IRB Approved':'Recorded'}</strong>
      <p>${status.title}</p>
    </article>
  `);

  cards.push(`
    <article class="summary-card attention">
      <span>Important</span>
      <strong>Not approval</strong>
      <p>
        This completion summary is a self-check only and cannot authorize IRB submission or research activity.
      </p>
    </article>
  `);

  document.getElementById('summary-board').innerHTML =
    cards.join('');
}

function updateOverall(){
  const groups = allCheckGroups();

  const checklistTotal = groups.reduce(
    (n,[,g])=>n+g.items.length,
    0
  );

  const checklistDone = groups.reduce(
    (n,[prefix,g])=>n+groupCount(prefix,g).done,
    0
  );

  const matrixTotal = alignmentRows.reduce(
    (n,row)=>n+row.cols.length,
    0
  );

  const matrixDone = Object.values(state.matrix)
    .filter(Boolean)
    .length;

  const total = checklistTotal+matrixTotal;
  const done = checklistDone+matrixDone;

  const pct = total
    ? Math.round(done/total*100)
    : 0;

  document.getElementById('overall-percent').textContent =
    `${pct}%`;

  document.getElementById('overall-bar').style.width =
    `${pct}%`;
}

function updateAllProgress(){
  updateGroupProgress();
  updateAlignment();
  updateOverall();
  updateSummary();
}

function printSummary(){
  const groups = allCheckGroups();

  const sections = groups.map(([prefix,g])=>{
    const rows = g.items.map((item,i)=>
      `<li>${isChecked(`${prefix}.${g.id}`,i)?'☑':'☐'} ${item}</li>`
    ).join('');

    return `
      <section>
        <h2>${g.title}</h2>
        <ul>${rows}</ul>
      </section>
    `;
  }).join('');

  const matrixRows = alignmentRows.map(row=>{
    const checked = row.cols.filter(
      col=>state.matrix[`${row.id}.${col}`]
    ).length;

    return `
      <tr>
        <td>${row.label}</td>
        <td>${checked} / ${row.cols.length}</td>
      </tr>
    `;
  }).join('');

  const p = pathwayInfo[state.pathway];

  const totalTime = Object.values(state.times).reduce(
    (n,v)=>n+(Number(v)||0),
    0
  );

  const w = window.open(
    '',
    '_blank',
    'width=1000,height=800'
  );

  if(!w){
    window.print();
    return;
  }

  w.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>ED825 IRB Readiness Summary</title>

        <style>
          body{
            font-family:Arial,sans-serif;
            margin:36px;
            color:#111;
            line-height:1.45;
          }

          h1{
            margin-bottom:4px;
          }

          .notice{
            border:2px solid #a00;
            padding:12px;
            margin:18px 0;
          }

          .meta{
            background:#f3f3f3;
            padding:12px;
          }

          .meta p{
            margin:4px 0;
          }

          section{
            break-inside:avoid;
            margin:20px 0;
          }

          ul{
            padding-left:22px;
          }

          li{
            margin:5px 0;
          }

          table{
            border-collapse:collapse;
            width:100%;
          }

          th,
          td{
            border:1px solid #bbb;
            padding:7px;
            text-align:left;
          }
        </style>
      </head>

      <body>
        <h1>ED825 IRB Readiness Summary</h1>
        <p>Supplemental student self-check</p>

        <div class="notice">
          <strong>
            This is not IRB approval, an official pathway determination, or authorization to begin research.
          </strong>
        </div>

        <div class="meta">
          <p>
            <strong>Current status:</strong>
            ${statusMessages[state.status].title}
          </p>

          <p>
            <strong>Proposed pathway:</strong>
            ${p?p.label:'Not selected'}
          </p>

          <p>
            <strong>Estimated participant time:</strong>
            ${totalTime} minutes
          </p>
        </div>

        ${sections}

        <section>
          <h2>Alignment Matrix Review</h2>

          <table>
            <thead>
              <tr>
                <th>Study element</th>
                <th>Comparisons marked reviewed</th>
              </tr>
            </thead>

            <tbody>
              ${matrixRows}
            </tbody>
          </table>
        </section>

        <p>
          <strong>Final reminder:</strong>
          Independently verify the current course and PG IRB requirements and consult faculty/RPC when uncertain.
        </p>
      </body>
    </html>
  `);

  w.document.close();
  w.focus();

  setTimeout(
    ()=>w.print(),
    250
  );
}

function wireEvents(){
  document.getElementById('student-status')
    .addEventListener('change',e=>{
      state.status = e.target.value;
      save();
      renderStatus();
    });

  document.getElementById('pathway-select')
    .addEventListener('change',e=>{
      state.pathway = e.target.value;
      save();
      renderPathway();
    });

  [
    'consent',
    'survey',
    'interview',
    'followup',
    'other'
  ].forEach(id=>{
    const input = document.getElementById(`time-${id}`);

    input.value = state.times[id] || 0;

    input.addEventListener(
      'input',
      updateTime
    );
  });

  document.getElementById('print-summary')
    .addEventListener(
      'click',
      printSummary
    );

  document.getElementById('clear-progress')
    .addEventListener('click',()=>{
      if(
        confirm(
          'Clear all ED825 readiness progress saved by this site in this browser?'
        )
      ){
        localStorage.removeItem(STORAGE_KEY);
        state = defaultState();
        renderAll();
      }
    });

  document.getElementById('menu-toggle')
    .addEventListener('click',e=>{
      const nav = document.getElementById('nav-links');

      const open = nav.classList.toggle('open');

      e.currentTarget.setAttribute(
        'aria-expanded',
        String(open)
      );
    });

  document.querySelectorAll('#nav-links a')
    .forEach(a=>
      a.addEventListener('click',()=>{
        document
          .getElementById('nav-links')
          .classList
          .remove('open');

        document
          .getElementById('menu-toggle')
          .setAttribute(
            'aria-expanded',
            'false'
          );
      })
    );
}

function renderAll(){
  renderStatus();
  renderPathway();
  renderPacket();
  renderSite();
  renderParticipantGroups();
  renderPreflight();
  renderMatrix();
  renderResources();
  wireChecks();
  updateTime();
  updateAllProgress();
}

renderAll();
wireEvents();
