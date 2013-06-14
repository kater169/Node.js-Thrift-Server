/**
get all clubs near
@param lon
@param lat
@param range
@return clubs
*/
service Clubs {
  double getNear(1: double lon, 2: double lat, 3: i32 range)
}