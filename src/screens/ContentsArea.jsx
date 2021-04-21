import React from 'react'
import MemberHomeHouseworkAria from '../components/MemberHomeHouseworkAria'
import Cash from './Cash'
import Exchange from './Exchange'

const ContentsArea = ({
  memberInfo,
  houseworkListInfo,
  // handleFlag,
  // clickedHousework,
  toggleBudge,
  exchangeCash,
  isPage,
  // flag,
  // getMemberId,
  items,
}) => {
  // console.log({ items })
  if (isPage === 'isHome') {
    return (
      <MemberHomeHouseworkAria
        houseworkListInfo={houseworkListInfo}
        memberInfo={memberInfo}
        toggleBudge={toggleBudge}
      />
    )
  } else if (isPage === 'isExchange') {
    return (
      <Exchange
        // isPage={isPage}
        // flag={flag}
        // handleFlag={handleFlag}
        memberInfo={memberInfo}
        items={items}
      />
    )
  } else if (isPage === 'isCash') {
    return <Cash memberInfo={memberInfo} exchangeCash={exchangeCash} />
  } else {
    return 'nothing page'
  }
}

export default ContentsArea
