export const meshMap = {
  imagetostl_mesh2: 'Apt 101',
  imagetostl_mesh6: 'Apt 201',
  imagetostl_mesh11: 'Apt 301',
  imagetostl_mesh15: 'Apt 401',
  imagetostl_mesh20: 'Apt 501',
  imagetostl_mesh3: 'Apt 102',
  imagetostl_mesh7: 'Apt 202',
  imagetostl_mesh12: 'Apt 302',
  imagetostl_mesh16: 'Apt 402',
  imagetostl_mesh21: 'Apt 502',
  imagetostl_mesh1: 'Apt 103',
  imagetostl_mesh5: 'Apt 203',
  imagetostl_mesh10: 'Apt 303',
  imagetostl_mesh14: 'Apt 403',
  imagetostl_mesh19: 'Apt 503',
  imagetostl_mesh0: 'Apt 104',
  imagetostl_mesh4: 'Apt 204',
  imagetostl_mesh9: 'Apt 304',
  imagetostl_mesh23: 'Apt 404',
  imagetostl_mesh18: 'Apt 504',
};

export const meshMapRev = {
  'Apt 101': 'imagetostl_mesh2',
  'Apt 201': 'imagetostl_mesh6',
  'Apt 301': 'imagetostl_mesh11',
  'Apt 401': 'imagetostl_mesh15',
  'Apt 501': 'imagetostl_mesh20',
  'Apt 102': 'imagetostl_mesh3',
  'Apt 202': 'imagetostl_mesh7',
  'Apt 302': 'imagetostl_mesh12',
  'Apt 402': 'imagetostl_mesh16',
  'Apt 502': 'imagetostl_mesh21',
  'Apt 103': 'imagetostl_mesh1',
  'Apt 203': 'imagetostl_mesh5',
  'Apt 303': 'imagetostl_mesh10',
  'Apt 403': 'imagetostl_mesh14',
  'Apt 503': 'imagetostl_mesh19',
  'Apt 104': 'imagetostl_mesh0',
  'Apt 204': 'imagetostl_mesh4',
  'Apt 304': 'imagetostl_mesh9',
  'Apt 404': 'imagetostl_mesh23',
  'Apt 504': 'imagetostl_mesh18',
};

export interface ApartmentData {
  name: string;
  highlighted?: boolean;
  state?: number;
}
