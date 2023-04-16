/**
 * @fileoverview Wall kick data for tetris pieces
 * @see https://tetris.wiki/SRS
 */
const JLSTZ_KICK_DATA = [
  [
    [0, 0],
    [-1, 0],
    [-1, 1],
    [0, -2],
    [-1, -2]
  ],
  [
    [0, 0],
    [1, 0],
    [1, -1],
    [0, 2],
    [1, 2]
  ],
  [
    [0, 0],
    [1, 0],
    [1, -1],
    [0, 2],
    [1, 2]
  ],
  [
    [0, 0],
    [-1, 0],
    [-1, 1],
    [0, -2],
    [-1, -2]
  ],
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, -2],
    [1, -2]
  ],
  [
    [0, 0],
    [-1, 0],
    [-1, -1],
    [0, 2],
    [-1, 2]
  ],
  [
    [0, 0],
    [-1, 0],
    [-1, -1],
    [0, 2],
    [-1, 2]
  ],
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, -2],
    [1, -2]
  ]
]

const I_KICK_DATA = [
  [
    [0, 0],
    [-2, 0],
    [1, 0],
    [-2, -1],
    [1, 2]
  ],
  [
    [0, 0],
    [2, 0],
    [-1, 0],
    [2, 1],
    [-1, -2]
  ],
  [
    [0, 0],
    [-1, 0],
    [2, 0],
    [-1, 2],
    [2, -1]
  ],
  [
    [0, 0],
    [1, 0],
    [-2, 0],
    [1, -2],
    [-2, 1]
  ],
  [
    [0, 0],
    [2, 0],
    [-1, 0],
    [2, 1],
    [-1, -2]
  ],
  [
    [0, 0],
    [-2, 0],
    [1, 0],
    [-2, -1],
    [1, 2]
  ],
  [
    [0, 0],
    [1, 0],
    [-2, 0],
    [1, -2],
    [-2, 1]
  ],
  [
    [0, 0],
    [-1, 0],
    [2, 0],
    [-1, 2],
    [2, -1]
  ]
]

const O_KICK_DATA = [
  [
    [0, 0],
    [0, 1],
    [-1, 1],
    [2, 0],
    [2, 1]
  ]
]

const WALL_KICK_DATA = {
  I: I_KICK_DATA,
  J: JLSTZ_KICK_DATA,
  L: JLSTZ_KICK_DATA,
  O: O_KICK_DATA,
  S: JLSTZ_KICK_DATA,
  T: JLSTZ_KICK_DATA,
  Z: JLSTZ_KICK_DATA
}

export default WALL_KICK_DATA
